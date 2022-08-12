/*
 *
 * HomePage
 *
 */

import React, { memo, useState, useEffect } from "react";
import {LoadingIndicatorPage} from "@strapi/helper-plugin"
import labelsRequests from "../../api/labels";
import { BaseHeaderLayout, Layout, ContentLayout } from "@strapi/design-system/Layout";

import LabelsTable from "../../components/LabelsTable";
import LabelsModal from "../../components/LabelsModal";

const HomePage = () => {

  const [labelsData, setLabelsData] = React.useState([]);
  const [localesData, setLocalesData] = React.useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    if (isLoading === false) setIsLoading(true);
    const labels = await labelsRequests.getAllLabels();
    setLabelsData(labels);
    setIsLoading(false);
  }

  const fetchLocales = async () => {
    if (isLoading === false) setIsLoading(true);
    const localesData = await labelsRequests.getAllLocales();
    setLocalesData(localesData);
    setIsLoading(false);
  }

  useEffect(async () => {
    await fetchData();
    await fetchLocales();
  },[])

  async function addLabel(data) {
    await labelsRequests.addLabel(data);
    await fetchData();
  }

  async function deleteLabel(key) {
    console.log("delete " + key)
    await labelsRequests.deleteLabel(key);
    await fetchData();
  }

  async function editLabel(rowLabel, value, newValue) {
    let id = 0;

    for (const v of rowLabel.values){
      if (v.locale == "en")
        id = v.id
    }

    await labelsRequests.editLabel(id, value, newValue );
    await fetchData();
  }

  if (isLoading) return <LoadingIndicatorPage />;

  return (
    <Layout>
      <BaseHeaderLayout 
        title="Label Manager"
        subtitle="Manage all your app labels from a single spreadsheet"
        as="h2"
      />

      <ContentLayout>
      <LabelsTable
        labelsData={labelsData}
        localesData={localesData}
        setShowModal={setShowModal}
        deleteLabel={deleteLabel}
        editLabel={editLabel}
      />

      </ContentLayout>
      {showModal && <LabelsModal setShowModal={setShowModal} addLabel={addLabel} labelsData={labelsData}/>}
    </Layout>
  );
};

export default HomePage;
