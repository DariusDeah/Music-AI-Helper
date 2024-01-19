import { faker } from "@faker-js/faker";
import { Pool } from "pg";

export async function seedUsers(pool: Pool) {
  const client = await pool.connect();

  const users = faker.helpers.multiple(
    () => {
      return {
        id: faker.string.uuid(),
        email: faker.internet.email(),
        username: (
          faker.internet.userName().trim() +
          "--" +
          faker.number.hex()
        ).trim(),
        password: faker.internet.password(),
        ip: faker.internet.ip(),
      };
    },
    {
      count: 50,
    }
  );

  users.forEach((user) => {
    console.log(user);
    client.query(
      "INSERT INTO users (id,email, username,password,ip) VALUES($1,$2,$3,$4,$5)",
      [user.id, user.email, user.username, user.password, user.ip]
    );
  });

  console.log(`seeded ${users.length} users`);
}
