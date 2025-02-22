import { render, screen, waitFor } from './test-utils';
import Home from '../components/Home';
import { setupServer } from 'msw/node';
const { rest } = require("msw");

setupServer(rest("https://newsapi.org/v2/everything", (req, res) => {
  return res(
    rest.json({
      articles: [
        { title: "Test News", description: "Test Description", urlToImage: "", url: "#" },
      ],
    })
  );
}));

const { cleanup } = setupServer();

afterAll(() => {
  cleanup();
});

test("fetches and displays news articles", async () => {
  render(<Home category="Technology" search="" />);
  await waitFor(() => screen.getByText("Test News"));
  expect(screen.getByText("Test News")).toBeInTheDocument();
  expect(screen.getByText("Test Description")).toBeInTheDocument();
}); 