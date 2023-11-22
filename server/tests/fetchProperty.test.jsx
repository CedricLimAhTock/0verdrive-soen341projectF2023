import { expect, test } from "vitest";
import axios from "axios";

test("Search API should return expected results", async () => {
  // Define the search query
  const query = {
    fields: {
      civicAddress: "",
      aptNumber: "",
      street: "Mcguire",
      neighbourhood: "",
      city: "Montreal",
      province: "Quebec",
      postalCode: "",
      country: "Canada",
      listingType: "sale",
    },
    sort: {
      parameter: "listedDate",
      order: "desc",
    },
  };

  // Make a request to the search API
  const response = await axios.post(
    "http://localhost:8080/property/search",
    query
  );

  // Assert that the response status is 200 (OK)
  expect(response.status).toBe(200);

  // Assert that the response data matches the expected format
  const result = response.data;
  expect(result.length).toBe(3);
});
