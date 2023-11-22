import { expect, test } from "vitest";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
test("Test signing user", async () => {
  let localStorage = null;
  // Define the search query
  const query1 = { username: "goofymemory", password: "root" };

  // Make a request to the search API
  const response = await axios.post("http://localhost:8080/signin/", query1);

  // Assert that the response status is 200 (OK)
  expect(response.status).toBe(200);
  localStorage.setItem("jwtToken", response.data.token);
  console.log(response.data.token);

  const decryptedToken = jwtDecode(localStorage.getItem("jwtToken"));

  expect(decryptedToken.username === "goofymemory");

  localStorage.removeItem("jwtToken");

  expect(localStorage.getItem("jwtToken") === null);

  //   const query2 = { username: "goofymemory2", password: "root2" };

  //   const response2 = await axios.post(`http://localhost:8080/signin/`, query2);
  //   expect(response2.data, message).toBe("User not found");

  // Assert that the response data matches the expected format

  // expect(result.createdAt).toBe("2000-01-01T04:00:00.000Z");
  // expect(result.updatedAt).toBe("2000-01-01T04:00:00.000Z");
});
