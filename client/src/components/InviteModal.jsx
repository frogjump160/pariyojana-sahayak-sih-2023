import React, { useState } from "react";

// components
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-hot-toast";
import { WithContext as ReactTags } from "react-tag-input";

function InviteModal(props) {
    const { show, onHide } = props;

    const [emailList, setEmailList] = useState([]);
    const [emails, setEmails] = useState([]);

    // const [tags, setTags] = useState([]);

    const KeyCodes = {
        comma: 188,
        enter: 13,
    };
    const delimiters = [KeyCodes.comma, KeyCodes.enter];

    const handleDelete = (i) => {
        setEmails(emails.filter((email, index) => index !== i));
    };

    const handleAddition = (email) => {
        setEmails([...emails, email]);
    };

    const handleDrag = (email, currPos, newPos) => {
        const newEmails = emails.slice();

        newEmails.splice(currPos, 1);
        newEmails.splice(newPos, 0, email);

        // re-render
        setEmails(newEmails);
    };

    const sendInvitations = async () => {
        try {
            onHide();

            toast.success("Invitations sent", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (err) {
            toast.error(err.message, {
                position: "top-center",
            });
        }
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Invite Faculties and Institutes
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ReactTags
                    tags={emails}
                    // suggestions={suggestions}
                    delimiters={delimiters}
                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    handleDrag={handleDrag}
                    // handleTagClick={handleTagClick}
                    inputFieldPosition="top"
                    placeholder="Press Enter to add new email"
                    // autocomplete
                />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
                <Button onClick={sendInvitations}>Send Invitations</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default InviteModal;
