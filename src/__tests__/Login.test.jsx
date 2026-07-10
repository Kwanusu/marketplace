import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { Login } from "@/pages/Login";
import { useAuth } from "@/context/AuthContext";

// Mock custom context hooks and navigation
const mockLogin = jest.fn();

jest.mock('@/context/AuthContext.jsx', () => ({
    useAuth: () => ({
        login: mockLogin,
    })
    
}));
const mockNavigate = jest.fn();
jest.mock ('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));
describe('Login Component', () => {


    beforeEach(() => {
        jest.clearAllMocks();
        useAuth.mockReturnValue({login: mockLogin})
    });
    const renderComponent = () => 
        render (
            <BrowserRouter>
                <Login/>
            </BrowserRouter>
        )

        it('renders the core structural component form and fields', () => {
            renderComponent();

            expect(screen.getByText('Welcome back')).toBeInTheDocument();
            expect(screen.getByLabelText('Email address')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /^sign in$/i })).toBeInTheDocument();
    });

    it('toggles password visibility when the eye button is selected', () => {
        renderComponent();
        
        const passwordInput = screen.getByLabelText('Password');
        
        // Clean, direct role selector targeted by your custom aria-label
        const toggleButton = screen.getByRole('button', { name: /show password/i });
        
        expect(passwordInput).toHaveAttribute('type', 'password');

        // Click to toggle view
        fireEvent.click(toggleButton);
        expect(passwordInput).toHaveAttribute('type', 'text');
    });

    it('submits credentials dynamically parses user name, calls login, and redirects', async () => {
        renderComponent();

        const emailInput = screen.getByPlaceholderText('name@example.com');
        const passwordInput = screen.getByLabelText('Password'); // Fixed strict label match here
        const submitButton = screen.getByRole('button', { name: /^sign in$/i });

        fireEvent.change(emailInput, { target: { value: 'alex.dev-space@gmail.com' } });
        fireEvent.change(passwordInput, { target: { value: 'supersecretpassword123' } });

        fireEvent.click(submitButton);

        expect(screen.getByText(/signing in.../i)).toBeInTheDocument();
        expect(submitButton).toBeDisabled();

        await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith(
            "jwt-access-token-example",
            expect.objectContaining({
            id: "u-secure-1",
            email: "alex.dev-space@gmail.com",
            name: "Alex Dev Space",
            role: "user"
            })
        );
        }, { timeout: 2000 });

        expect(mockNavigate).toHaveBeenCalledWith('/');
    });
})
    