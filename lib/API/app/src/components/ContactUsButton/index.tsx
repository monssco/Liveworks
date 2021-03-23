import React from 'react'
import { Link } from 'gatsby';
import Button from '../Button';

interface Props {
    
}

const ContactUsButton = (props: Props) => {
    return (
        <Link to="/contact" >
            <Button text="Contact Us"/>
        </Link>
    )
}

export default ContactUsButton;
