import {rest} from 'msw';

export const handler = [
    rest.get("http://localhost:3000",(req,res,ctx)=>{
console.log("handler")
    return res(
        ctx.json({
            OQ4vFFxLQzJKHg6gNgQX:{title:"sx",category:"bird",url:"https://firebasestorage.googleapis.com/v0/b/firegram-93fd0.appspot.com/o/snapshot%2Fboris-smokrovic-DPXytK8Z59Y-unsplash-compressed.jpg?alt=media&token=778af372-8b2c-41b8-93bd-59292a7aaf82",timestamp:"Jul 28, 2023}"},
            OQ4vFFxLQzJKHg6gNgQZ:{title:"big",category:"bird",url:"https://firebasestorage.googleapis.com/v0/b/firegram-93fd0.appspot.com/o/snapshot%2Fboris-smokrovic-DPXytK8Z59Y-unsplash-compressed.jpg?alt=media&token=778af372-8b2c-41b8-93bd-59292a7aaf82",timestamp:"Jul 28, 2023}"},
            OQ4vFFxLQzJKHg6gNgQZ:{title:"hus",category:"bird",url:"https://firebasestorage.googleapis.com/v0/b/firegram-93fd0.appspot.com/o/snapshot%2Fboris-smokrovic-DPXytK8Z59Y-unsplash-compressed.jpg?alt=media&token=778af372-8b2c-41b8-93bd-59292a7aaf82",timestamp:"Jul 28, 2023}"}
        })
    )
    })
]