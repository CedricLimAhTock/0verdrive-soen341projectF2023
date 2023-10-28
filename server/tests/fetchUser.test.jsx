import { expect, test } from "vitest";
import axios from "axios";

test("Search API should return expected results", async (t) => {
  // Define the search query
  const query = "root1";

  // Make a request to the search API
  const response = await axios.get(
    `http://localhost:8080/user/username/${query}`
  );

  // Assert that the response status is 200 (OK)
  expect(response.status).toBe(200);

  // Assert that the response data matches the expected format
  const result = response.data;

  expect(typeof result.id).toBe("number");
  expect(typeof result.active).toBe("boolean");
  expect(typeof result.firstname).toBe("string");
  expect(typeof result.lastname).toBe("string");
  expect(typeof result.username).toBe("string");
  expect(typeof result.email).toBe("string");
  expect(typeof result.password).toBe("string");
  expect(typeof result.phone).toBe("string");
  // expect(typeof result.createdAt).toBe("string");
  // expect(typeof result.updatedAt).toBe("string");

  expect(result.id).toBe(1);
  expect(result.active).toBe(true);
  expect(result.firstname).toBe(query);
  expect(result.lastname).toBe(query);
  expect(result.username).toBe(query);
  expect(result.email).toBe(query);
  expect(result.password).toBe("");
  expect(result.phone).toBe("000-000-0000");
  expect(result.createdAt).toBe("2000-01-01T04:00:00.000Z");
  expect(result.updatedAt).toBe("2000-01-01T04:00:00.000Z");
});
