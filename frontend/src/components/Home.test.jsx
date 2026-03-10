import { it, describe, vi, beforeEach, expect } from "vitest"
import Home from "./Home"
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, within } from "@testing-library/react";
import { screen } from "@testing-library/react";
import axios from "axios";

describe("Test Home Page", () => {
  let fetchCart;
  let products;
  let cart_length;
  beforeEach(() => {
    vi.mock("axios");
    fetchCart = vi.fn();
    cart_length = vi.fn(() => 1);
    products = [{
      "id": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      "image": "images/products/athletic-cotton-socks-6-pairs.jpg",
      "name": "Black and Gray Athletic Cotton Socks - 6 Pairs",
      "rating": {
        "stars": 4.5,
        "count": 87
      },
      "priceCents": 1090,
      "keywords": ["socks", "sports", "apparel"]
    },
    {
      "id": "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      "image": "images/products/intermediate-composite-basketball.jpg",
      "name": "Intermediate Size Basketball",
      "rating": {
        "stars": 4,
        "count": 127
      },
      "priceCents": 2095,
      "keywords": ["sports", "basketballs"]
    }]
  });

  it("diplays all the products", () => {
    render(
      //links need a browserRouter to work
      <MemoryRouter>
        <Home products={products} fetchCart={fetchCart} cart_length={cart_length} />
      </MemoryRouter>
    );
    expect(
      screen.getByText("Black and Gray Athletic Cotton Socks - 6 Pairs")
    ).toBeInTheDocument();
  });

  it("test axios:get", () => {
    //mock the result we get if a person was to make a get request
    axios.get.mockResolvedValueOnce({ "data": products });
    const loadProducts = async () => {
      const res = await axios.get("/api/products");
      return res.data;
    };
    //resolves -> waits for the data to load before comparing
    expect(loadProducts()).resolves.toEqual(products);
  });

  it("diplayes the products correctly", async () => {
    render(
      <MemoryRouter>
        <Home products={products} fetchCart={fetchCart} cart_length={cart_length} />
      </MemoryRouter>
    );
    const productContainer = await screen.findAllByTestId("product_container");
    expect(productContainer.length).toBe(2);
    //check if the attributes are correct
    expect(within(productContainer[0]).getByText("Black and Gray Athletic Cotton Socks - 6 Pairs")).toBeInTheDocument();
    expect(within(productContainer[1]).getByText("Intermediate Size Basketball")).toBeInTheDocument();
  });

})