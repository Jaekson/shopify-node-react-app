import { useState } from "react";
import { ResourcePicker, TitleBar } from "@shopify/app-bridge-react";
import { TextStyle, Page, Layout, EmptyState } from "@shopify/polaris";
/**
 * This tutorial uses localStorage to persist data. You’ll use store.js,
 * a cross-browser JavaScript library for managing localStorage, to set and receive
 * data using the store_set and store_get methods. This works well for testing your
 * development app. But if you were building this app in production,
 * then you’d probably want to store these IDs in a database.
 */
import store from "store-js";
import ResourceListWithProducts from "../components/ResourceList";

const img = "https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg";

const IndexComp = () => (
  <Page>
    <Layout>
      <TextStyle variation="positive">
        Sample app using React and Next.js
      </TextStyle>
    </Layout>
  </Page>
);

const Index = () => {
  const [open, setIsOpen] = useState(false);
  const emptyState = !store.get("ids");

  function handleSelection(resources) {
    const idsFromResources = resources.selection.map((product) => product.id);
    setIsOpen(false);
    console.log(resources);
    store.set("ids", idsFromResources);
  }

  return (
    <Page>
      <TitleBar
        title="Sample App"
        primaryAction={{
          content: "Select products",
          onAction: () => setIsOpen(true),
        }}
      />
      <ResourcePicker
        resourceType="Product"
        showVariants={false}
        open={open}
        onSelection={(resources) => handleSelection(resources)}
        onCancel={() => setIsOpen(false)}
      />
      {emptyState ? (
        <Layout>
          <EmptyState
            heading="Discount your products temporarily"
            action={{
              content: "Select products",
              onAction: () => setIsOpen(true),
            }}
            image={img}
          >
            <p>Select products to change their price temporarily.</p>
          </EmptyState>
        </Layout>
      ) : (
        <ResourceListWithProducts />
      )}
    </Page>
  );
};

export default Index;
