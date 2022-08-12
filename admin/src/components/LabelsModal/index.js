import React, { useState } from "react";

import {
  ModalLayout,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Typography,
  Button,
  TextInput,
} from "@strapi/design-system";
import { Box } from "@strapi/design-system/Box";
import { Textarea } from "@strapi/design-system/Textarea";


export default function LabelsModal({ setShowModal, addLabel, labelsData }) {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");

  const handleSubmit = async (e) => {
    // Prevent submitting parent form
    e.preventDefault();
    e.stopPropagation();

    try {
      await addLabel({ key: name, value: value });
      setShowModal(false);
    } catch (e) {
      console.log("error", e);
    }
  };

  const getError = () => {
    if (labelsData.filter(label => label.key == name).length > 0) 
      return `Key ${name} is already present`;
    return null;
  };

  return (
    <ModalLayout
      onClose={() => setShowModal(false)}
      labelledBy="title"
      as="form"
      onSubmit={handleSubmit}
    >
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          Add new Label
        </Typography>
      </ModalHeader>

      <ModalBody>
        <Box paddingBottom={5}>
          <Typography fontWeight="semiBold" textColor="neutral800">
            You can add a new label just adding the english value
          </Typography>
        </Box>
        <Box paddingBottom={2}>
          <TextInput
            paddingTop="2"
            placeholder="Label's key"
            label="Key"
            name="key"
            error={getError()}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </Box>
        <Box paddingBottom={2}>
          <Textarea
            label="English Value"
            value={value}
            placeholder="Label's english value"
            onChange={(e) => {
              setValue(e.target.value);
            }}
            style={{
              height: "unset",
              minWidth: "200px",
              resize: "auto",
              border: "none",
              padding: 0,
              background: "transparent",
            }}
            name="value"
            rows={2}
          />
        </Box>
      </ModalBody>

      <ModalFooter
        startActions={
          <Button onClick={() => setShowModal(false)} variant="tertiary">
            Cancel
          </Button>
        }
        endActions={<Button type="submit">Add Label</Button>}
      />
    </ModalLayout>
  );
}
