const Footer = () => {
    return (
        <footer className="py-8 bg-gray-800 text-white text-center">
            <p>&copy; 2025 Orienteering Adventures. All rights reserved.</p>
            <div className="mt-4">
                <a href="/about" className="mx-4">
                    About
                </a>
                <a href="/contact" className="mx-4">
                    Contact
                </a>
                <a href="/privacy" className="mx-4">
                    Privacy Policy
                </a>
            </div>
        </footer>
    );
};

export default Footer;
