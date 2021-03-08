import { css } from "lit-element";

export default css`
.wrapper {
  max-width: 600px;
  padding: 10px 16px;
  margin: 0 auto;
}

.container:not(:last-of-type) {
  margin: 0 0 30px;
}

.title {
  font-size: 25px;
  margin: 1px 0 8px;
}

.description {
  padding: 24px;
  margin: 12px;
  background-color: #eeeeee;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.links > div:not(.title) {
  display: flex;
  align-items: center;
  margin: 5px 0;
}
.links a {
  text-decoration: none;
}

a, .link {
  text-decoration: underline;
  color: black;
  cursor: pointer;
}

b {
  font-weight: 100;
}

.tag {
  display: inline-block;
  padding: 6px 8px;
  background-color: var(--mdc-theme-primary);
  color: white;
  border-radius: 4px;
  margin: 4px;
  white-space: nowrap;
}
`