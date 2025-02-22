// src/pages/CollegeAllocation.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Input, Select, Pagination } from "antd";

const { Search } = Input;
const { Option } = Select;
const API_BASE_URL = "http://192.168.29.72:8000"; // Replace with your actual IP

// function CollegeAllocation() {
const CollegeAllocation = () => {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [cetyear, setYear] = useState(2020);
    
    const [filterOptions, setFilterOptions] = useState({ colleges: [], categories: [] });

    const [collegeCodes, setCollegeCodes] = useState([]);
    const [categories, setCategories] = useState([]);

    const [filters, setFilters] = useState({
        search: "",
        cetyear: "",
        collegecode: "",
        category: "",
        limit: 10,
        offset: 0,
    });

    useEffect(() => {
        fetchFilters();
        fetchData();
    }, [filters]);
    const years = [2023, 2022, 2021, 2020];
    const fetchFilters = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/filters`);
            setFilterOptions(response.data);
            setCollegeCodes(response.data.collegeCodes);
            setCategories(response.data.categories);

        } catch (error) {
            console.error("Error fetching filter options", error);
        }
    };
    
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/seat_allotments`, {
                params: filters,
            });
            setData(response.data.data);
            setTotal(response.data.total);
            
        } catch (error) {
            console.error("Error fetching data", error);
        }
        setLoading(false);
    };

    const handleSearch = (value) => {
        setFilters({ ...filters, search: value, offset: 0 });
    };

    const handleFilterChange = (field, value) => {
        setFilters({ ...filters, [field]: value, offset: 0 });
    };


    const handleTableChange = (pagination, _, sorter) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            offset: (pagination.current - 1) * pagination.pageSize,
            limit: pagination.pageSize,
            sort_by: sorter.field || prevFilters.sort_by || "cutoffrank",
            order: sorter.order === "ascend" ? "asc" : "desc",
            collegecode: prevFilters.collegecode,
            category: prevFilters.category,
            cetyear: prevFilters.cetyear
        }));
    };

    const columns = [
        { title: "Year", dataIndex: "cetyear", key: "cetyear", sorter: true },
        { title: "Round", dataIndex: "cetround", key: "cetround", sorter: true },
        { title: "CollegeCode", dataIndex: "collegecode", key: "collegecode", sorter: true },
        { title: "College", dataIndex: "college", key: "college", sorter: true },
        { title: "Course", dataIndex: "course", key: "course", sorter: true },
        { title: "Category", dataIndex: "category", key: "category", sorter: true },
        { title: "Seat Count", dataIndex: "seatcount", key: "seatcount", sorter: true },
        { title: "Cutoff Rank", dataIndex: "cutoffrank", key: "cutoffrank", sorter: true },
    ];

    return (
        <div className="p-4">
            <div className="flex gap-2 mb-4">
                <Search
                    placeholder="Search College or Course"
                    onSearch={handleSearch}
                    enterButton
                />
                <Select
                    placeholder="Select Year"
                    onChange={(value) => handleFilterChange("cetyear", value)}
                >
                    <Option value="2020">2020</Option>
                    <Option value="2021">2021</Option>
                </Select>
  
                <Select
                    placeholder="Select College"
                    onChange={(value) => handleFilterChange("collegecode", value)}
                >
                    {collegeCodes.map((college) => (
                        <Option key={college} value={college}>{college}</Option>
                    ))}
                </Select>
                <Select
                    placeholder="Select Category"
                    onChange={(value) => handleFilterChange("category", value)}
                >
                    {categories.map((category) => (
                        <Option key={category} value={category}>{category}</Option>
                    ))}
                </Select>
                <Select
                    placeholder="Sort Order"
                    onChange={(value) => handleFilterChange("order", value)}
                >
                    <Option value="asc">Ascending</Option>
                    <Option value="desc">Descending</Option>
                </Select>
            </div>
            <Table
                columns={columns}
                dataSource={data}
                rowKey={(record) => record.id}
                loading={loading}
                pagination={{ total, pageSize: filters.limit }}
                onChange={handleTableChange}
            />
        </div>
    );
};

export default CollegeAllocation;