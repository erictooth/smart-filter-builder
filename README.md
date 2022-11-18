# smart-filter-builder

## Example

```typescript
import { ExactMatch, LessThan } from "smart-filter-builder/filters";
import { And, Or } from "smart-filter-builder/operators";
import { Field } from "smart-filter-builder/sources";
import { predicateToCEL } from "smart-filter-builder/utilities";

const incompatibleBrowser = Or(
  And(
    Or(
      Field("browser.name", ExactMatch("Chrome")),
      Field("browser.name", ExactMatch("Edge"))
    ),
    Field("browser.version", LessThan(79))
  ),
  And(
    Field("browser.name", ExactMatch("Firefox")),
    Field("browser.version", LessThan(67))
  ),
  And(
    Field("browser.name", ExactMatch("Safari")),
    Field("browser.version", LessThan(13))
  )
);

incompatibleBrowser({ browser: { name: "Safari", version: "12" } }); // => true
predicateToCEL(incompatibleBrowser); // => (browser.name == "Chrome" || browser.name == "Edge") && browser.version < 79 || browser.name == "Firefox" && browser.version < 67 || browser.name == "Safari" && browser.version < 13
```
