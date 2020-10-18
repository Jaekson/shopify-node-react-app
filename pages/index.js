import { useState } from "react";
import { ResourcePicker, TitleBar } from "@shopify/app-bridge-react";
import { TextStyle, Page, Layout, EmptyState } from "@shopify/polaris";

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

  function handleSelection(resources) {
    setIsOpen(false);
    console.log(resources);
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
    </Page>
  );
};

export default Index;
