import { it, describe, expect, vi, beforeEach } from "vitest"
import Products from "./Products"
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";

describe("test landing page", () => {
  let product;
  let fetchCart;
  beforeEach(() => {
    vi.mock("axios"); //mocks axios
    fetchCart = vi.fn(); //mock fetchCart
    product = {
      "id": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      "image": "images/products/athletic-cotton-socks-6-pairs.jpg",
      "name": "Black and Gray Athletic Cotton Socks - 6 Pairs",
      "rating": {
        "stars": 4.5,
        "count": 87
      },
      "priceCents": 1090,
      "keywords": ["socks", "sports", "apparel"]
    };

  });

  it("diplay products", () => {
    render(<Products product={product} />)
    expect(screen.getByText("Black and Gray Athletic Cotton Socks - 6 Pairs")).toBeInTheDocument();
    expect(screen.getByText("$10.90")).toBeInTheDocument();
    expect(screen.getByText("87")).toBeInTheDocument();
    expect(screen.getByTestId("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")).toHaveAttribute("src", "images/products/athletic-cotton-socks-6-pairs.jpg");
    expect(screen.getByTestId("stars")).toHaveAttribute("src", `images/ratings/rating-${(product.rating.stars) * 10}.png`);
  });

  it("adds product to cart", async () => {
    render(
      <Products product={product} fetchCart={fetchCart} />
    )
    const user = userEvent.setup();
    const btn = screen.getByTestId("add_to_cart")
    await user.click(btn);
    expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
      "productId": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      "quantity": 1
    });
    expect(fetchCart).toHaveBeenCalled();
  });
});