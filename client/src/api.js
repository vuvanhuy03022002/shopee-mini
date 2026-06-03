
import axios from "axios"

export const api = axios.create({
  baseURL: "http://localhost:3000"
})
router.beforeEach(
(to,from,next)=>{

const protectedRoutes =
[
'/cart'
]

const token =
localStorage.getItem(
'token'
)

if(
protectedRoutes.includes(
to.path
)
&& !token
){

return next(
'/login'
)

}

next()

}
)