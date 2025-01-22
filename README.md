# 用户 API 使用 NestJS

本项目是一个基于 NestJS、Mongoose 和 GraphQL 的用户管理 API。它提供用户注册、登录和个人资料管理的功能，使用 JWT 进行身份验证。

## 目录

- [功能](#功能)
- [安装](#安装)
- [配置](#配置)
- [使用](#使用)
- [API 接口](#api-接口)
- [许可证](#许可证)

## 功能

- 用户注册和登录
- 基于 JWT 的身份验证
- GraphQL API
- bcrypt 密码哈希加盐
- MongoDB 数据存储
- 输入验证

## 安装

1. **克隆仓库：**

   ```bash
   git clone https://github.com/hhyufan/user-api.git
   cd user-api
   ```

2. **安装依赖：**

   ```bash
   npm install
   ```
3. **更新 @nestjs\passport 插件**

   此外，你需要将`passport\auth.guard.js`文件移动到`node_modules\@nestjs\passport\dist`，覆盖原始文件。
   - **代码 40-44 行：**
   ``` javascript
   const  { req } = context.args[2]
   const [request, response] = [
       req,
       this.getResponse(context)
   ];
   ```
   - **代码 61-70 行：**
   ``` javascript
   handleRequest(err, user, info, context, status) {
      if (info) {
        console.log(info)
        throw new common_1.UnauthorizedException();
      }
      if (err) {
        throw err || new common_1.UnauthorizedException();
      }
      return user;
    }
   ```
   通过以上改动，jwt可以正确处理request并进行正确的身份验证。
4. **设置 MongoDB：**

   确保你已安装并运行 MongoDB。可以使用本地实例或类似 MongoDB Atlas 的云服务。

5. **创建 `.env` 文件：**

   在项目根目录下创建 `.env` 文件，并添加以下变量：

   ```env
   PORT=4000
   GRAPHQL_PATH=/api
   MONGODB_URI=mongodb://localhost:27017/user
   JWT_SECRET=yourSecretKey
   ```

   将 `yourSecretKey` 替换为一个强大的 JWT 签名密钥。

## 配置

该应用配置了以下模块：

- **MongooseModule**：用于 MongoDB 连接。
- **GraphQLModule**：用于 GraphQL API 设置。
- **ConfigModule**：用于管理环境变量。
- **AuthModule**：用于身份验证功能。
- **UsersModule**：用于用户管理功能。

## 使用

1. **启动应用：**

   ```bash
   npm run start
   ```

2. **访问 GraphQL Playground：**

   打开浏览器，导航至 `http://localhost:4000/api` 来与 API 进行交互。

## API 接口

### 身份验证

#### 登录

- **描述:** 用户通过用户名和密码进行登录，成功后返回 JWT 令牌。
- **输入:**
  ``` graphql
  mutation {
    login(loginInput: { username: "YuFan", password: "12345" })
  }
  ```
- **响应:** 返回一个 JWT 令牌。

#### 注册

- **描述:** 用户通过提供姓名、电子邮件和密码进行注册，成功后返回 JWT 令牌。
- **输入:**
  ``` graphql
  mutation {
    register(registerInput: {name: "YuFan", email: "1838248655@qq.com", password: "123456"})
  }
  ```
- **响应:** 返回一个 JWT 令牌。

### 用户管理

- **获取所有用户**
    - **描述:** 获取所有用户信息，返回用户数组。需要 JWT 身份验证。
    - **输入:**
      ``` graphql
      {
        users {
          name
          email
        }
      }
      ```
    - **响应:** 返回用户数组。

- **根据 ID 获取用户**
    - **描述:** 根据用户 ID 获取用户信息。需要 JWT 身份验证。
    - **输入:**
      ``` graphql
      {
        user(id: yourUserId) {
          name
        }
      }
      ```
    - **响应:** 返回用户对象。

## 许可证

本项目采用 MIT 许可证。有关更多详细信息，请参阅 [LICENSE](LICENSE) 文件。

---

以上是详细的登录、注册和验证实现的说明。如果还有其他问题或需要进一步的细节，请随时告知！
