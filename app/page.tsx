"use client";

import { useState, useEffect } from "react";
import { Table, Checkbox, Input, Button } from "antd";

interface Item {
  selected: boolean;
  id: string;
  name: string;
}

const Home: React.FC = () => {
  const [data, setData] = useState<Item[]>([]);
  const [initialValue, setInitialValue] = useState<Item[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/api/getDataFromJson")
      .then((response) => response.json())
      .then((res) => {
        setData(JSON.parse(JSON.stringify(res.data)));
        setInitialValue(JSON.parse(JSON.stringify(res.data)));
        setLoading(false);
      });
  }, []);

  const handleReset = () => {
    setData(initialValue);
  };

  const handleSave = () => {
    fetch("/api/saveDataToJson", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    }).then(() => {
      alert("Data is Updated!");
    });
  };

  const handleCheckboxChange = (checked: boolean, index: number) => {
    const newData = [...data];
    newData[index].selected = checked;
    setData(newData);
  };

  const handleInputChange = (value: string, index: number, key: "name") => {
    const newData = [...data];
    newData[index][key] = value;
    setData(newData);
  };

  const columns = [
    {
      title: "Select",
      dataIndex: "selected",
      render: (text: any, record: Item, index: number) => (
        <Checkbox
          checked={record.selected}
          onChange={(e) => handleCheckboxChange(e.target.checked, index)}
        />
      ),
    },
    {
      title: "ID",
      dataIndex: "id",
      render: (text: any, record: Item) => <span>{record.id}</span>,
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text: any, record: Item, index: number) => (
        <Input
          value={record.name}
          onChange={(e) => handleInputChange(e.target.value, index, "name")}
        />
      ),
    },
  ];

  return (
    <div>
      {isLoading ? (
        <b> Loading.... </b>
      ) : (
        <>
          <Table
            dataSource={data}
            columns={columns}
            rowKey="id"
            pagination={false}
          />
          <div className="flex justify-end mt-4">
            <Button onClick={handleReset} className="mr-2">
              Reset
            </Button>
            <Button type="primary" className="mr-2" onClick={handleSave}>
              Save
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
