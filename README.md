
## CommentZu - Backend
CommentZu is a MERN stack comment system where users can create, view, like, and dislike comments in real time.

## Important Links
- Frontend live site:https://comment-zu-frontend.vercel.app/
- Backend live site: https://commentzu-backend.onrender.com

## Tech Stack / Packages
#### Backend
- MongodDB
- ExpressJS
- NodeJS
- Mongoose
- SocketIo
- Typescript
- JWT
- Bcrypt
- Cookie Parser
- Cors
- Dotenv
- Zod

#### Frontend
- ReactJS
- Socket.io-Client
- ShadcnUI
- TailwindCSS
- Zod
- React hook Form
- Axios
- React router dom
- Typescript


## .env Credential

Backend
```env
      NODE_ENV=development
      PORT=5000
      DATABASE_URL="mongodb+srv://commentzu-techzu:FUu0fX9JzRvklY7i@cluster0.svueayl.mongodb.net/commentzu"
      SALT_ROUNDS=12
      TOKEN_SECRET="secret_token"
      TOKEN_EXPIRE="30d"
```

Frontend
```env
      VITE_API_BASE_URL="https://commentzu-backend.onrender.com/api"
      VITE_API_SOCKET_URL="https://commentzu-backend.onrender.com"
```

## API Endpoints

### Authentication
-  `POST /api/v1/auth/register`
```json
// request body
{
    "firstName": "Kh.",
    "lastName": "Shakil",
    "email": "shakil2@gmail.com",
    "password": "shakil"
}
```

-  `POST /api/v1/auth/login`
```json
// request body
{
    "email": "shakil@gmail.com",
    "password": "shakil"
}
```

### Comment
-  `POST /api/v1/comment`
```json
// request body
{
	"content":  "non et atque occaecati deserunt quas accusantium unde odit nobis qui voluptatem quia voluptas consequuntur itaque dolor et qui rerum deleniti ut occaecati"
}
```
-  `GET /api/v1/comment?page=1&limit=2&sortBy=newest&sortOrder=asc`
- `GET /api/v1/comment/[commentId]/like`
- `GET /api/v1/comment/[commentId]/dislike`
- `POST /api/v1/comment/[commentId]/reply`
```json
// request body
{
	"content":  "test"
}
```
- `GET /api/v1/comment/[commentId]/reply`
- `DELETE /api/v1/comment/[commentId]/parent`