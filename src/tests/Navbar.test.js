import { render, screen, fireEvent } from './test-utils'; // Import the custom render function
import Navbar from '../components/Navbar';

it("renders Navbar and allows searching", () => {
  const setCategory = jest.fn();
  
  // Render the Navbar wrapped in the DarkModeProvider
  render(<Navbar setCategory={setCategory} />);

  const searchInput = screen.getByPlaceholderText(/Search news/i);
  const searchButtons = screen.getAllByRole("button"); // Get all buttons

  // Assuming the search button is the last button in the list
  const searchButton = searchButtons[searchButtons.length - 1];

  // Simulate user input
  fireEvent.change(searchInput, { target: { value: "Technology" } });
  fireEvent.click(searchButton);

  // Assert that setCategory was called with the correct argument
  expect(setCategory).toHaveBeenCalledWith("Technology");
});