# smart-filter-builder

## Example

```typescript
import { After, Is, LessThan } from "smart-filter-builder/filters";
import { And, Or } from "smart-filter-builder/operators";
import { Field } from "smart-filter-builder/sources";
import { predicateToCEL } from "smart-filter-builder/utilities";

const incompatibleBrowser = And(
  Field("user.lastSeen", After(Temporal.Now.instant().subtract({ months: 1 }))),
  Or(
    And(
      Or(
        Field("browser.name", Is("Chrome")),
        Field("browser.name", Is("Edge"))
      ),
      Field("browser.version", LessThan(79))
    ),
    And(
      Field("browser.name", Is("Firefox")),
      Field("browser.version", LessThan(67))
    ),
    And(
      Field("browser.name", Is("Safari")),
      Field("browser.version", LessThan(13))
    )
  )
);

incompatibleBrowser({ browser: { name: "Safari", version: "12" } }); // => true
predicateToCEL(incompatibleBrowser); // => (browser.name == "Chrome" || browser.name == "Edge") && browser.version < 79 || browser.name == "Firefox" && browser.version < 67 || browser.name == "Safari" && browser.version < 13
```
