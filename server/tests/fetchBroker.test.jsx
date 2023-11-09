import { expect, test } from "vitest";
import axios from "axios";

test("Search API should return expected results", async (t) => {
  // Define the search query
  const query = {
    fields: {
      firstname: "Courtney",
      lastname: "Ramirez",
    },
  };

  // Make a request to the search API
  const response = await axios.post(
    "http://localhost:8080/broker/search",
    query
  );

  // Assert that the response status is 200 (OK)
  expect(response.status).toBe(200);

  // Assert that the response data matches the expected format
  const result = response.data[0];
  const { user } = result;

  expect(result.id).toBe(5);
  expect(result.user_id).toBe(11);
  expect(result.active).toBe(true);
  expect(user.firstname).toBe(query.fields.firstname);
  expect(result.license_number).toBe("b5d1ada5-92d3-4dd7-a0e5-925ad0453b6d");
  expect(result.email).toBe("gormes4@addthis.com");
  expect(user.lastname).toBe(query.fields.lastname);
});
