import React, { useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";

const VendorManagement = () => {
  const [vendors, setVendors] = useState([
    { id: 1, name: "ABC Catering", service: "Catering", contact: "9876543210", price: "$5000" },
    { id: 2, name: "XYZ Decorators", service: "Decoration", contact: "8765432109", price: "$3000" },
  ]);

  const [show, setShow] = useState(false);
  const [vendorData, setVendorData] = useState({ id: null, name: "", service: "", contact: "", price: "" });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorData({ ...vendorData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (vendorData.id) {
      setVendors(vendors.map((v) => (v.id === vendorData.id ? vendorData : v)));
    } else {
      setVendors([...vendors, { ...vendorData, id: vendors.length + 1 }]);
    }
    setVendorData({ id: null, name: "", service: "", contact: "", price: "" });
    handleClose();
  };

  const handleEdit = (vendor) => {
    setVendorData(vendor);
    handleShow();
  };

  const handleDelete = (id) => {
    setVendors(vendors.filter((vendor) => vendor.id !== id));
  };

  return (
    <div className="container mt-4">
      <h2>Vendor Management</h2>
      <Button variant="primary" onClick={handleShow} className="mb-3">
        Add Vendor
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Service</th>
            <th>Contact</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor, index) => (
            <tr key={vendor.id}>
              <td>{index + 1}</td>
              <td>{vendor.name}</td>
              <td>{vendor.service}</td>
              <td>{vendor.contact}</td>
              <td>{vendor.price}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEdit(vendor)}>
                  Edit
                </Button>{" "}
                <Button variant="danger" size="sm" onClick={() => handleDelete(vendor.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{vendorData.id ? "Edit Vendor" : "Add Vendor"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={vendorData.name} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Service</Form.Label>
              <Form.Control type="text" name="service" value={vendorData.service} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact</Form.Label>
              <Form.Control type="text" name="contact" value={vendorData.contact} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control type="text" name="price" value={vendorData.price} onChange={handleChange} required />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default VendorManagement;
