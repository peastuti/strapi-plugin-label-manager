import React, { useState } from "react";
import {
  Table,
  Thead,
  TFooter,
  Tbody,
  Tr,
  Td,
  Th,
} from "@strapi/design-system/Table";
import { Box } from "@strapi/design-system/Box";
import { Flex } from "@strapi/design-system/Flex";
import { Typography } from "@strapi/design-system/Typography";
import { IconButton } from "@strapi/design-system/IconButton";
import { Button } from "@strapi/design-system/Button";
import { Textarea } from "@strapi/design-system/Textarea";
import Plus from "@strapi/icons/Plus";
import Check from "@strapi/icons/Check";
import Cross from "@strapi/icons/Cross";
import Trash from "@strapi/icons/Trash";
import CarretDown from "@strapi/icons/CarretDown";
import ExclamationMarkCircle from "@strapi/icons/ExclamationMarkCircle";
import { SimpleMenu, MenuItem } from "@strapi/design-system/SimpleMenu";
import { Dialog, DialogBody, DialogFooter } from '@strapi/design-system/Dialog';
import { Stack } from '@strapi/design-system/Stack';


export default function LabelsTable({
  labelsData,
  localesData,
  deleteLabel,
  editLabel,
  setShowModal,
}) {
  return (
    <Box
      background="neutral0"
      hasRadius={true}
      shadow="filterShadow"
      padding={8}
      style={{ marginTop: "10px" }}
    >
      <Table
        colCount={9}
        rowCount={1000}
        footer={
          <TFooter onClick={() => setShowModal(true)} icon={<Plus />}>
            Add a new Label
          </TFooter>
        }
      >
        <Thead>
          <Tr>
            <Th>
              <Typography variant="sigma">Key</Typography>
            </Th>

            {localesData.map((locale) => {
              return (
                <Th key={locale}>
                  <Typography variant="sigma">{locale}</Typography>
                </Th>
              );
            })}

          </Tr>
        </Thead>

        <Tbody>
          {labelsData.map((label) => {
            const [inputValue, setInputValue] = useState(label.key);
            const [myValues, setMyValues] = useState(label.values);

            return (
              <Tr key={label.key}>
                <Td>
                  <Typography fontWeight="bold" textColor="neutral800">{label.key}</Typography>
                </Td>

                {myValues.map((value, index) => {
                  if (value.value == null) value.value = " -/- ";
                  if (value.value == "") value.value = " -[Empty]- ";

                  const [myValue, setMyValue] = useState(value.value);
                  const [isEdit, setIsEdit] = useState(false);
                  const [isVisible, setIsVisible] = useState(false);


                  return (
                    <Td key={label.key + value.locale + value.value}>
                      {isEdit ? (
                        <Box>
                          <Textarea
                            value={myValue}
                            onChange={(e) => {
                              setMyValue(e.target.value);
                            }}
                            style={{
                              height: "unset",
                              minWidth: "200px",
                              resize: "auto",
                              border: "none",
                              padding: 0,
                              background: "transparent",
                            }}
                            name={"value"}
                            rows={1}
                          />
                          <Flex
                            paddingTop={1}
                            style={{ justifyContent: "end" }}
                          >
                            <SimpleMenu
                              size="S"
                              label="Actions"
                              as={IconButton}
                              icon={<CarretDown />}
                            >
                              <MenuItem
                                onClick={() => {
                                  console.log("Translate from EN");
                                }}
                              >
                                Translate From EN
                              </MenuItem>
                              <MenuItem onClick={() => { setIsVisible(true) }} >
                                Delete entire row (Label)
                              </MenuItem>
                            </SimpleMenu>
                            <Dialog onClose={() => setIsVisible(false)} title="Confirmation" isOpen={isVisible}>
                                <DialogBody icon={<ExclamationMarkCircle />}>
                                <Stack spacing={2}>
                                    <Flex justifyContent="center">
                                    <Typography id="confirm-description">Are you sure you want to delete the following label?</Typography>
                                    </Flex>
                                    <Flex justifyContent="center">
                                    <Typography paddingTop={2} variant="omega" fontWeight="bold">{label.key}</Typography>
                                    </Flex>
                                </Stack>
                                </DialogBody>
                                <DialogFooter startAction={<Button onClick={() => setIsVisible(false)} variant="tertiary">
                                    Cancel
                                    </Button>} endAction={<Button onClick={() => deleteLabel(label.key)} variant="danger-light" startIcon={<Trash />}>
                                    Confirm
                                    </Button>} />
                            </Dialog>
                            <IconButton
                              onClick={() => {
                                setIsEdit(false);
                                if (myValue != value.value)
                                    editLabel(label, value, myValue);
                                if (myValue == ""){
                                    setMyValue(" -/- ")
                                }
                              }}
                              label="Save"
                              icon={<Check />}
                            />
                            <IconButton
                              onClick={() => {
                                setIsEdit(false);
                                setMyValue(value.value);
                              }}
                              label="Cancel"
                              icon={<Cross />}
                            />
                          </Flex>
                        </Box>
                      ) : (
                        <Box 
                        onClick={() => { 
                            if(myValue == " -/- " || myValue == " -[Empty]- ")
                                setMyValue("")
                            setIsEdit(true); 
                        }}>
                            <Typography ellipsis style={{ width: "200px", }} textColor="neutral800"> {myValue} </Typography>
                        </Box>
                      )}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}
