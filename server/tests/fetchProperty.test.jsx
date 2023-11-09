import { expect, test } from "vitest";
import axios from "axios";

test("Search API should return expected results", async (t) => {
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
      //   "price": {},
      //   "livingArea": { "min": 0, "max": 9999 },
      propertyArea: { min: 0, max: 99999 },
      numOfBedrooms: { min: 0, max: 1000 },
      //   "numOfBathrooms": { "min": 0, "max": 1000 },
      //   "numOfFloors": { "min": 0, "max": 1000 },
      //   "yearBuilt": { "min": "2023-01-01" },
      listedDate: {},
      propertyType: "",
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
