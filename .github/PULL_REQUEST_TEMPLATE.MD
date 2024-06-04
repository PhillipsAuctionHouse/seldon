**Jira ticket**

[Jira Ticket ID](https://phillipsauctions.atlassian.net/browse/TICKET-ID)

**Screenshots**
| Before | After |
| ------ | ----- |
| Paste Before Image | Paste After Image |

**Summary**

Add high-level overview of the changes that were made and explanation of WHY they were made

**Change List (describe the changes made to the files)**

- Additions, Changes, and Removals

**Acceptance Test (how to verify the PR)**

- Add step by step instructions on how to verify the change

**Regression Test**

- (Optional) Add verification steps to make sure this PR doesn't break old functionality

**Evidence of testing**

- Post logs, screenshots, etc

<!-- For reviewers: do not remove -->

**Things to look for during review**

- [ ] PR title should correctly describe the most significant type of commit. I.e. `feat(scope): ...` if a `minor` release should be triggered.
- [ ] All commit messages follow convention and are appropriate for the changes
- [ ] All references to `phillips` class prefix are using the prefix variable
- [ ] All major areas have a `data-testid` attribute.
- [ ] Document all props with jsdoc comments
- [ ] All strings should be translatable.
- [ ] Unit tests should be written and should have a coverage of 90% or higher in all areas.

New Components

- [ ] Default story called "Playground" should be created for all new components
- [ ] Create a jsdoc comment that has an Overview section and a link to the Figma design for the component
- [ ] Export the component and its typescript type from the `index.ts` file
