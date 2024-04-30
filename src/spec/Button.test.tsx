import { fireEvent, render, waitFor } from "@testing-library/react";
import { screen } from '@testing-library/react'
import SimpleButton from "../stories/SimpleButton";

describe('SimpleButton', () => {
  test('button text test', () => {
    const { container } = render(<SimpleButton text={'Click Me'} disabled={false} />);
    container.querySelector('.container__button');
    expect(screen.getByText('Click Me')).toBeInTheDocument();
    expect(container.firstChild).toBeNull;
  });

  test('button state test', () => {
    const { container } = render(<SimpleButton text={'Click Me'} disabled={true} />);
    container.querySelector('.container__button');
    const ele = document.getElementById('container-button');
    expect(screen.getByText('Click Me')).toBeInTheDocument();
    expect(ele?.className).toEqual('container__button container__button--disabled');
  });

  test('disabled button no hovering text test', () => {
    render(
      <SimpleButton
        text={'Click Me'} disabled={true} 
      />
    );
    fireEvent.mouseEnter(screen.getByTestId("container-button"));
    expect(screen.findByText('Unable to View Now')).toBeNull;
  });

  test('enabled button hovering text test', async () => {
    render(<SimpleButton text={'Click Me'} disabled={false} message={"Unable to View Now"} />);
    fireEvent.mouseEnter(screen.getByTestId("container-button"));
    expect(screen.findByText("Unable to View Now")).toBeNull;
  });

  test('opens modal when button is clicked test', async () => {
    render(<SimpleButton text={'Click Me'} disabled={false} />);
    fireEvent.click(screen.getByTestId("container-button"));
    waitFor(() => {
      expect(screen.findByText("Submit Your Feedback: Emotion")).toBeInTheDocument();
      expect(screen.findByText("OK")).toBeInTheDocument();
    });
  });
});
