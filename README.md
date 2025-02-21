To run the following commands, follow these steps:

1. Copy the example environment file to a new `.env` file:

   ```sh
   cp .env.example .env
   ```

2. Obtain a GitHub access key:

   - Go to [GitHub Settings](https://github.com/settings/tokens)
   - Click on "Generate new token"
   - Select the scopes (repo) and generate the token
   - Copy the token and paste it in .env

3. Install the necessary npm packages:

   ```sh
   npm i
   ```

4. Run the Node.js application:
   ```sh
   node index.js
   ```
