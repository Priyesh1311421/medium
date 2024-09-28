import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign,verify} from 'hono/jwt'
import { cors } from 'hono/cors'
import { createBlogInput, signinInput, signupInput, updateBlogInput } from '@tech100x/medium-common'


const app = new Hono<{
  
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  },
  Variables:{
    userId: string;
  }
}>();

app.use(cors());

app.use('/api/v1/blog/*', async(c,next)=>{
  // get the header 
  // verify the header
  // if the header is correct then we can proceed further 
  // else return status 403 to the user
  const header = c.req.header("authorization") || "";
  const token = header.split(" ")[1];
  const user = await verify(token,c.env.JWT_SECRET)
  if (user.id){
    c.set("userId", user.id.toString());
    await next()
  }
  c.status(403);
  return c.json({error:'unauthorized'})
})


app.post('/api/v1/signup', async (c) => {
  const body = await c.req.json();
  const {success} = signupInput.safeParse(body);
  if (!success){
    c.status(400);
    return c.json({message:'invalid input'});
  }
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());
	
	try {
		const user = await prisma.user.create({
			data: {
				email: body.email,
				password: body.password,
        name: body.name
			}
		});
	  
    const token = await sign({id:user.id},c.env.JWT_SECRET);

		return c.json({
      jwt: token
    })
	} catch(error) {
		c.status(403)	}
    return c.json({message: 'error creating user'})
})


app.post('/api/v1/signin', async(c) => {
  const body = await c.req.json();
  const {success} = signinInput.safeParse(body);
  if (!success){
    c.status(400);
    return c.json({message:'invalid input'});
  }
  const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

  try {
    
    const user = await prisma.user.findUnique({
      where:{
        email:body.email,
        password:body.password
      }
    })
    if(!user){
       c.status(403);
      return c.json({message:'user not found'})
    }
    const token = await sign({id:user.id},c.env.JWT_SECRET)
    return c.json({jwt: token});
  } catch (error) {
    c.status(403);
    return c.json({message:'error in signing in'})

  }
})

app.post('/api/v1/blog', async(c) => {
  const body = await c.req.json();
  const {success} = createBlogInput.safeParse(body);
  if(!success){
    c.status(400);
    return c.json({message:'invalid input'})
  }
  const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());
  
  
  const blog = await prisma.post.create({
    data:{
      title: body.title,
      content: body.content,
      authorId: c.get('userId')
    }
  })

  return c.json({ id:blog.id })
})

app.put('/api/v1/blog', async(c) => {
  const body = await c.req.json();
  const {success} = updateBlogInput.safeParse(body);
  if(!success){
    c.status(400);
    return c.json({message:'invalid input'})
  }
  const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());
  
  
  const blog = await prisma.post.update({
    where:{
      id: body.id
    },
    data:{
      title: body.title,
      content: body.content,
    }
  })

  return c.json({ blog})
})

app.get('/api/v1/blog/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      author: {
        select: {
          email: true,
          name: true,
        },
      },
    },
  });
  return c.json({ blogs });
});

app.get('/api/v1/blog/:id', async(c) => {
  const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());
  
  const id =  c.req.param('id');
  try {
    const blog = await prisma.post.findFirst({
      where:{
        id: id
      },
      select:{
        id:true,
        title:true,
        content:true,
        author:{
          select:{
            email:true,
            name:true,
          }
        }
      }
    })
  
    return c.json({ blog })
  } catch (error) {
    c.status(411)
    c.json({message:'error in fetching the blog post'})
  }
})
export default app


