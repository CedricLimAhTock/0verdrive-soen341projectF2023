import { expect, test } from "vitest";
import axios from "axios";
const query = "clove ville";
test("Search API should return expected results", async (t) => {
  // Make a request to the search API
  const response = await axios.post("http://localhost:8080/property/search", {
    fields: {
      manyTerms: query,
    },
    sort: {
      parameter: "price",
      order: "asc",
    },
  });

  // Assert that the response status is 200 (OK)
  expect(response.status).toBe(200);

  // Assert that the response data matches the expected format
  const result = response.data;

  expect(result.length).toBe(86);

  result.map((property) => {
    expect(typeof property.id).toBe("number");
    expect(typeof property.active).toBe("boolean");
    expect(typeof property.civic_address).toBe("string");
    expect(typeof property.apt_number).toBe("string");
    expect(typeof property.street).toBe("string");
    expect(typeof property.neighbourhood).toBe("string");
    expect(typeof property.city).toBe("string");
    expect(typeof property.province).toBe("string");
    expect(typeof property.postal_code).toBe("string");
    expect(typeof property.country).toBe("string");
    expect(typeof property.listing_type).toBe("string");
    expect(typeof property.price).toBe("number");
    expect(typeof property.living_area).toBe("number");
    expect(typeof property.property_area).toBe("number");
    expect(typeof property.num_bedrooms).toBe("number");
    expect(typeof property.num_bathrooms).toBe("number");
    expect(typeof property.num_floors).toBe("number");
    expect(typeof property.year_built).toBe("string");
    expect(typeof property.listed_date).toBe("string");
    expect(typeof property.property_type).toBe("string");
  });
});
