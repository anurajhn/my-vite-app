// src/pages/CollegeList.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Input, Select, Pagination } from "antd";

const { Search } = Input;
const { Option } = Select;
const API_BASE_URL = "http://192.168.29.72:8000"; // Replace with your actual IP

// function CollegeList() {
const CollegeList = () => {

    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [filterOptions, setFilterOptions] = useState({ locations: [], cities: [] });

    const [locations, setLocations] = useState([]);
    const [cities, setCities] = useState([]);

    const [filters, setFilters] = useState({
        search: "",
        collegecode: "",
        city: "",
        limit: 10,
        offset: 0,
    });
    useEffect(() => {
        fetchFilters();
        fetchData();
    }, [filters]);
    
    const fetchFilters = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/Collegefilters`);
            setFilterOptions(response.data);
            setLocations(response.data.locations);
            setCities(response.data.cities);

        } catch (error) {
            console.error("Error fetching filter options", error);
        }
    };
        
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/collegeList`, {
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
        { title: "CollegeCode", dataIndex: "collegecode", key: "collegecode", sorter: true },
        { title: "College", dataIndex: "college", key: "college", sorter: true },
        { title: "location", dataIndex: "location", key: "location", sorter: true },
        { title: "city", dataIndex: "city", key: "city", sorter: true },
    ];


    return (
        <div className="p-4">
            <div className="flex gap-2 mb-4">
            <h3 className="text-xl font-bold">List of Engineering Colleges in Karnataka</h3>
            { /* <p>Here will be the list of all colleges...</p> */ }
 
            <Select
                placeholder="Select Location"
                onChange={(value) => handleFilterChange("location", value)}
            >
                {locations.map((location) => (
                    <Option key={location} value={location}>{location}</Option>
                ))}
            </Select>
            <Select
                placeholder="Select City"
                onChange={(value) => handleFilterChange("city", value)}
            >
                {cities.map((city) => (
                    <Option key={city} value={city}>{city}</Option>
                ))}
            </Select>
            
            <Select
                placeholder="Sort Order"
                onChange={(value) => handleFilterChange("order", value)}
            >
                <Option value="asc">Ascending</Option>
                <Option value="desc">Descending</Option>
            </Select>
            <Select
                placeholder="Select Location"
                onChange={(value) => handleFilterChange("location", value)}
            >
                
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

export default CollegeList;