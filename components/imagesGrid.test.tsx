import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // For additional matchers like toBeInTheDocument
import userEvent from "@testing-library/user-event";
import ImagesGridLists from "./ImagesGridLists";


jest.mock("../helper/api-util.js", () => ({
    getGallarys: jest.fn().mockResolvedValue([
      {
        id:"1",
        cc: "28 jan",
        title: "mountain1",
        category: "Mountain",
        url:"https://images.unsplash.com/photo-1512250591270-0bea37004c99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
        
      },
      {
        id:"2",
        timeStamp: "64c27168e1feb5ce8f572abb",
        title: "bird1",
        category: "bird",
        imageUrl:"https://media.istockphoto.com/id/936604286/photo/holes-at-the-biches-coastline-mauritius-island.jpg?s=612x612&w=0&k=20&c=pvT7qEVmG_aBkQpYLGvDe_tdc9SkwyKVHUlYwEGfNgw=",
        
      },
    ]),
  }));

const setImageHandler = (img: string) => {
    
  }; 




  test("renders the component correctly", async () => {
    const { getGallarys } = require("../helper/api-util");
    const data = await getGallarys();
    render(<ImagesGridLists gallaryItems={data} setImage={setImageHandler}/>);
  
    expect(screen.getByText("Title: bird1")).toBeInTheDocument();
    
    expect(screen.getByText("Title: mountain1")).toBeInTheDocument();
  });

  test('should show "No Record found" when no matching items are found', async () => {
  
    const { getGallarys } = require("../helper/api-util");
    const data = await getGallarys();
    render(<ImagesGridLists gallaryItems={[]} setImage={setImageHandler}/>);
  
    // No items should be visible, and "No Record found" should be displayed
    const noRecordMessage = screen.getByText("no record found");
    expect(noRecordMessage).toBeInTheDocument();
  });
