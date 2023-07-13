---
title: Testing best practices
---

Robust testing is crucial for a dev team's agility and velocity. Having a comprehensive test suite allows us to deliver capabilities to our sites faster and with less regressions. Quality test also help ensure that the code we deliver is on par with the standards of Phillips Auction House. Because of this, it is imperative to keep testing in mind when developing new features.

## When should we write test

When to write your unit test often comes down to personal preference. [Test driven development](<https://testdriven.io/test-driven-development/#:~:text=Test%2DDriven%20Development%20(TDD),It%20combines%20building%20and%20testing>) (**TDD**) is a popular methodology and a great way to help think about what you need to code by starting with the desired result. This strategy takes time for some to get used to. Some developers prefer starting with code. If this is you, be sure to write your unit test as soon as possible after implementing a feature. By doing so, you ensure coverage of the new code and get immediate feedback if you introduce regressions as you continue development.

Regardless of if you write your test before, during, or after, **each piece of functionality should have coverage**. Otherwise, there is no way to know, with confidence, that the changes we make are not going to break things for our consumers.

## Code coverage

Code coverage is a metric that allows us to quickly assess how much of our functionality is being tested. While PR coverage thresholds can be frustrating, it is the best tool we have to get a snapshot of areas of our code that need more unit test. Any project in production should have coverage thresholds as part of the acceptance criteria for taking in new code. While **100% coverage is ideal**, each project should assess what level of coverage is acceptable for them. A threshold around 90% is a good balance. At this level you are getting a high level of confidence while not requiring perfection.

Coverage is not a goal in and of itself. **Developers should not be writing test to get coverage up over a threshold**. Rather, the coverage report should guide you to areas of your code that may need more thorough testing.

Test are also a good way to audit our own coding styles. If your code is hard to test, it may be overly complex. Figuring out how to test your code can guide you in ways to better modularize the functionality and simplify it for yourself and your team.

## Writing test for Phillips

In this project, we use [Jest](https://jestjs.io/docs/29.x/api) as the test runner for our unit test. For selections and interactions in jest we are using the [React Testing library](https://testing-library.com/docs/react-testing-library/api). With these two libraries we are able to use modern testing best practices to interact with our code in ways that are similar to how an end user would.

Each test file should be collocated in the same directory with the file that the test are ran against. The test runner will attempt to run any file that has the `.test.js` extension.

While writing your test you should use the following style:

```js
// Each test suite should be wrapped in a describe block.
// It should contain the name of the component being tested.
describe('HeroBanner', () => {
  // The assertations are ran inside an it block.
  // The title for each test should be desciptive of the test being performed
  it('render headerText as an h1', () => {
    ...
    expect(condition).toEqual(expectation)
  });
});
```

Jest places `describe`, `it`, `expect`, and all assertions (`toEqual`, etc.) in the global scope and they are available without import.

By convention, the `describe` block title argument should be the name of the component or file that you are testing. This helps organize the file and makes for a nicer console output when reading test results. By using `describe` we also encapsulate variables and setup code needed for our test so that these values do not leak into other test runs.

Each `it` block title component should be descriptive of what we are trying to test. These titles should follow sentence structure (e.g. 'it will auto number each child').

> **<span style="text-shadow: 0 0 1.5px #000;">💡</span>TIP:** Describe blocks can be nested within each other and the console output will reflect this nesting. Think touch theme vs. desktop. If the touch theme implementation relies on different setup code than the desktop, these can be split into separate `describe` blocks within the title describe block. (ie. 'Accordion' -> 'Accordion desktop', 'Accordion touch theme')

## Setup and teardown

Many times we may need additional setup code ran before we can test all functionality. Jest comes with a few [helpers](https://jestjs.io/docs/setup-teardown) to allow us to run our setup without having to repeat code or create our own helpers. The `beforeEach` and `beforeAll` methods allow control over when our setup code is ran while the `afterEach` and `afterAll` methods allows us to clean up after our test finish

```js
// This one will be ran for ALL test in the file
// and before the ones declared in the describe block
beforeEach(() => {
  ...
})

describe('Accordion', () => {
  let emitter;
  const mockedMethod = jest.fn();
  // This is ran just for the test in this describe block.
  beforeEach(() => {
    emitter = new EventEmitter();
  })
  beforeEach(() => {
    // If your code returns a promise return to this method to ensure
    // that the value is available before test are ran
    return methodThatReturnsAPromise();
  })

  afterEach(() => {
    mockedMethod.mockRestore()
  })

  it('will auto number each child', () => {
    ...
  });
});
```

> **<span style="text-shadow: 0 0 1.5px #000;">💡</span> TIP:** If you have a test that often fails when it's run as part of a larger suite, but doesn't fail when you run it alone, it's a good bet that something from a different test is interfering with this one. You can often fix this by clearing some shared state with beforeEach. If you're not sure whether some shared state is being modified, you can also try a beforeEach that logs data. - [Jest docs](https://jestjs.io/docs/setup-teardown#general-advice)

## Component testing

We have already talked about how to structure our test. `describe` blocks should encapsulate similar code and each `it` block should be descriptive of what we are testing. When writing component test the `describe` block title should be the component name. Devs should scope all setup code inside this block using any of the [helper methods](#setup-and-teardown) available.

To use the React Testing Library [methods](https://testing-library.com/docs/react-testing-library/api) we need to import them at the top of the file. The two main items are `render` and `screen`. Other common imports from this library are `waitFor` and `within`.

```js
import { render, screen, waitFor, act, within } from '@testing-library/react';
```

### **`render`**

The first method renders our component into a container (`div`) that gets appended to `document.body`. From this return [value](https://testing-library.com/docs/react-testing-library/api#render-result) we can destructure other helpful methods and properties.

The `container` is the containing DOM node of your rendered React Element. This is a regular DOM node so you can use any of the methods or properties available (e.g. `container.firstChild`). The `rerender` method allows us to update props of the rendered component.

```js
const { container, rerender } = render(
  <Accordion id="accordion1" autoNumberChildren={true}>
    <AccordionItem id="accordionItem1">...</AccordionItem>
    <AccordionItem id="accordionItem2">...</AccordionItem>
  </Accordion>
);
```

> **<span style="text-shadow: 0 0 1.5px #000;">💡</span> TIP:** 🚨 If you find yourself using `container` to query for rendered elements then you should reconsider! The other queries are designed to be more resilient to changes that will be made to the component you're testing. Avoid using container to query for elements! - React Testing Library docs

The `render` method also takes an [options argument](https://testing-library.com/docs/react-testing-library/api#render-options) that will allow modifications of its behavior. Our `Accordion` example, for instance, is an unordered list. If we wanted to test the `AccordionItem` in isolation we could not render inside the default `div` while still keeping semantics. Instead we can use the [container option](https://testing-library.com/docs/react-testing-library/api/#container) to render inside an `ul` element.

### **`screen`**

While we could destructure each [query](https://testing-library.com/docs/queries/about/#overview) we need from the `render` call, the `screen` object comes with all available queries. This means that you no longer need to keep the `render` call destructure up-to-date as you add/remove queries when your test change.

```js
const form = screen.getByTestId('phillips-form');
const submit = screen.getByLabelText(/Submit/);
```

> **<span style="text-shadow: 0 0 1.5px #000;">💡</span> TIP:** For convenience `screen` also comes with a few helpful [debugging](https://testing-library.com/docs/queries/about/#debugging) methods. `screen.debug()` will pretty print out the rendered DOM into the console. This is especially convenient when your queries are not returning what's expected. `screen.debug()` supports debugging the document, a single element, or an array of elements. If the output is longer than the character limit `debug takes a second argument (e.g. `screen.debug(null, Infinity)`). [docs](https://testing-library.com/docs/dom-testing-library/api-debugging/#prettydom)

### Asynchronous code

React Testing Library provides several [utilities](https://testing-library.com/docs/dom-testing-library/api-async/) for dealing with asynchronous code. These methods are useful when we must wait for our rendered output to change in response to an event, user action, timeout, or Promise. These methods return a promise so be sure to use `await` when calling them.

Take the following example of a `ComponentThatNeedsData`. The datasource is first loaded. Then the component state updates with the returned data. If we were to assert right after the render call in our test this check would fail because the component would still be in a loading state. However, our async methods allow us to wait for the state to flush out and continue checking the assertion until it passes or it times out.

```js
describe('ComponentThatNeedsData', () => {
  it('renders with data from a datasource', async () => {
    let datasource = newDatasource();
    await datasource.load();
    render(
      <ComponentThatNeedsData datasource={datasource} loading={datasource.state.loading} ... />
    );
    expect(await screen.findByText('SomeDataFromDataSource')).toBeInTheDocument()
    // `waitFor` equivalent:
    await waitFor(() =>
      expect(screen.getByText('SomeDataFromDataSource')).toBeInTheDocument()
    );
  });
});
```

### **`act()`**

If you have tested React components before you may be familiar with [`act`](https://legacy.reactjs.org/docs/test-utils.html#act) or you may have been puzzled with this error in your console,

```
Warning: An update to MyComponent inside a test was not wrapped in act(...).
```

So, what is this and why are your test complaining about it?

`act` is a helper utility method that ensures that all rendering, user events, or data fetching get processed and applied to the DOM before you make any assertions. It mimics how React behaves in a real browser setting and make "tests run closer to what real users would experience when using our applications".

> **<span style="text-shadow: 0 0 1.5px #000;">💡</span> TIP:** One of the benefits of using React Testing Library is that all their methods come pre-wrapped in an `act` call. The only reason to need this helper utility now is if we are triggering a state update with one of our own methods.

So, when do we need to use act? Our use of React Testing Library almost entirely eliminates the need of using `act` . One of the few reasons to use it directly are for events that we trigger from our own code. **If your test depends on a state update or data from an api call you will need to wrap the actions that trigger these events in `act`.** Let's look at an example where we use an event emitter that updates our component's title state.

```js
/*************************
 * MyComponent.js
 ************************/
const MyComponent = () => {
  const [title, setTitle] = React.useState();
  React.useEffect(() => {
    const handleTextUpdate = () => setTitle(e);
    // Our component listens for a `title-update` event which,
    // when emitted, will udpate our component state with the new title.
    eventBus.on('title-update', handleTextUpdate);

    return () => eventBus.off('title-update', handleTextUpdate);
  }, []);

  return <p>{title}</p>;
};

/*************************
 * MyComponent.test.js
 ************************/
// 🚫 Results in an error: "Warning: An update to MyComponent inside a test was not wrapped in act(...)."
it('My component updates title when "title-update" event is emitted', () => {
  render(<MyComponent />);
  eventBus.emit('title-update', 'my new title');
  expect(screen.queryByText('my new title')).toBeInTheDocument();
});

// ✅ Results in a passed test as our state has been applied
it('My component updates title when "title-update" event is emitted', () => {
  render(<MyComponent />);
  act(() => eventBus.emit('title-update', 'my new title'));
  expect(screen.queryByText('my new title')).toBeInTheDocument();
});
```

Using React Testing Library and wrapping our own methods in `act` fix our first warning but there is one more act error that can be confusing to new users of these libraries.

```
Warning: You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls ...
```

If you see this warning chances are you are not waiting on the `act` call to return
before calling the next one. To fix this issue you need to add await to the method
that is triggering an update.

```js
// 🚫 This will throw the overlapping act warning
userEvent.click(screen.getByText(/submit/));
expect(await screen.findByText('loading')).toBeInTheDocument();

// ✅ This passes with no error
await userEvent.click(screen.getByText(/submit/));
expect(await screen.findByText('loading')).toBeInTheDocument();
```

### Queries and user events

React Testing Library provides multiple [types](https://testing-library.com/docs/queries/about/#types-of-queries) of queries that are used to find elements on the page. The difference between them is whether it will throw an error if no element is found or if it will retry. Check out their [priority guide](https://testing-library.com/docs/queries/about/#priority) for their recommendations on which queries to use to test your component in the most accessible way.

Once we have selected elements on the page we can then perform actions on them or make our assertions. If you want to peform user actions React Testing Library has a [`user-event`](https://testing-library.com/docs/user-event/intro) package. While future versions of the library come with an export of `user-event` for now we must import like so:

```js
import userEvent from '@testing-library/user-event';
```

This package replaces the older `fireEvent` api which only fires DOM events. `user-event` "simulates full _interactions_ which may fire multiple events and do additional checks along the way" - [React Testing Library docs](https://testing-library.com/docs/user-event/intro#differences-from-fireevent). This aims to, again, manipulate the DOM in a way closer to the way a user's interaction in the browser would. For example, a browser would not allow a user to click on a hidden element.

**Note: There are [some interactions](https://github.com/testing-library/user-event/issues?q=is%3Aopen+label%3Aaccuracy%2Cenhancement) that are not yet implemented with `user-event`. This would be the only use case for using the `fireEvent` api.**

For simple interactions, like a click of a button, you can call the APIs directly on the default export. For more complex interactions, like the clipboard api, you should invoke [`userEvent.setup()`](https://testing-library.com/docs/user-event/setup/) before the component is rendered. This API allows you to configure an "instance" of `user-event`. Methods on this instance share one input device state (e.g. which keys are pressed) that allow you to write consecutive interactions.

```js
import userEvent from '@testing-library/user-event';

const user = userEvent.setup();

await user.keyboard('[ShiftLeft>]'); // Press Shift (without releasing it)
await user.click(element); // Perform a click with `shiftKey: true`
```

> The more your tests resemble the way your software is used, the more confidence they can give you.

## Best practices

**<span style="text-shadow: 0 0 1.5px #000;">💡</span>** Avoid writing `expect(component).toMatchSnapshot()` assertions in your test until your component coverage is above the threshold. **SNAPSHOTS ARE NOT UNIT TEST!** Unit test should tell us that our code is doing what we expect it to do and snapshots only tell us if changes are made over time. If your coverage comes from snapshot testing then your component is not covered!

**<span style="text-shadow: 0 0 1.5px #000;">💡</span>** When asserting that an item state has flipped (visible/hidden, inDOm/notInDom) based off a user event, you must test your assertion before and after to ensure the behavior is working as expected.

```js
expect(screen.queryByRole('button')).toBeInTheDocument();
await userEvent.click(screen.getByText(/submit/));
expect(screen.queryByRole('button')).not.toBeInTheDocument();
```

**<span style="text-shadow: 0 0 1.5px #000;">💡</span>** Selectors used more than once should be assigned to a variable to prevent multiple look ups which can slow the test down.

```js
const items = screen.getAllByTestId('accordion-item');
expect(items[0].getAttribute('number')).toEqual('1');
expect(items[1].getAttribute('number')).toEqual('2');
```

**<span style="text-shadow: 0 0 1.5px #000;">💡</span>** When testing both a state and its inverse do not split into to two test but combine into one test and use `rerender` method.

```js
// Instead of two
it('will auto number each child', () => { <Accordion id='accordion1' autoNumberChildren={true}> ... </Accordion> }
it('will not auto number each child', () => { <Accordion id='accordion1' autoNumberChildren={false}> ... </Accordion> }

// Combine into one test and use rerender
it('will only auto number each child when autoNumberChildren is true', () => { ... }
```

**<span style="text-shadow: 0 0 1.5px #000;">💡</span>** Only add the bare minimum of props needed to test a piece of functionality. If a prop is not required do not add it. This will simplify the file and make debugging easier when test fail.

```js
// Bad - If not testing a function or a prop do not add them
const myFunc = jest.fn();
<Accordion id='accordion1' autoNumberChildren={true} onClick={myFunc} someOtherProp={value}>...</Accordion>
// Good
<Accordion id='accordion1' autoNumberChildren={true}>...</Accordion>
```

**<span style="text-shadow: 0 0 1.5px #000;">💡</span>** Add an accessibility check to each unique prop configuration in your test. Our components need to be accessible in all their variations. Robust unit test will prevent us from delivering inaccessible code in our apps.

```js
await expect(container).toBeAccessible();
```

## Learn more:

- [React Testing Library guiding principals](https://testing-library.com/docs/guiding-principles/)
- [Types of queries available from React Testing Library](https://testing-library.com/docs/queries/about/#types-of-queries)
- [Priority of queries (what is the best query for the job?)](https://testing-library.com/docs/queries/about/#priority)
- [Common mistakes when using React Testing Library](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Expect Matchers](https://jestjs.io/docs/27.x/expect)
