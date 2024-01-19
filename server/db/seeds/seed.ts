import { pool } from "../../server";
import { seedUsers } from "./user.seed";

function seed() {
  seedUsers(pool);
}
seed();
