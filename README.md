# Update Monday status action

This action will update the status column on Monday.com if a pulse url
is mentioned in a pull request.

## Inputs

### `API_TOKEN`

**Required** - Monday.com API v2 Token

### `BOARD_ID`

**Required** - Unique board identifier in Monday.com


### `COLUMN_ID`

**Required** - Column identifier in Monday.com


### `submitted-status`

**Required** - Monday.com status when pull request has been submitted


### `merged-status`

**Required** - Monday.com status when pull request has been merged. Default `"status"`


### `pull-request-body`

**Required** - Pull request body

### `merged`

**Required** - True if the pull request has been merged, false if not


## Example usage

```yaml
uses: willstenzel/update-monday-status-action@v1
with:
  API_TOKEN: ${{ secrets.API_TOKEN }}
  BOARD_ID: 524963988
  COLUMN_ID: "status"
  submitted-status: "PR Submitted"
  merged-status: "Done"
  pull-request-body: ${{ github.event.pull_request.body }}
  merged: ${{ github.event.pull_request.merged }}
if: contains(github.event.pull_request.body, 'pulses')
```
