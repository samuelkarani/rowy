import type { ISetupStep, ISetupStepBodyProps } from "../types";

import { Typography, Link, Button } from "@mui/material";
import InlineOpenInNewIcon from "@src/components/InlineOpenInNewIcon";

import SetupItem from "../SetupItem";

import { WIKI_LINKS } from "@src/constants/externalLinks";

export default {
  id: "oauth",
  shortTitle: "Access",
  title: "Allow Firebase access",
  body: StepOauth,
} as ISetupStep;

function StepOauth({ isComplete, setComplete }: ISetupStepBodyProps) {
  return (
    <>
      <div>
        <Typography variant="inherit" paragraph>
          Allow Rowy to manage your Firebase Authentication, Firestore database,
          and Firebase Storage.
        </Typography>
        <Typography variant="inherit">
          Your data and code always stays on your Firebase project.{" "}
          <Link
            href={WIKI_LINKS.setup}
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more
            <InlineOpenInNewIcon />
          </Link>
        </Typography>
      </div>

      <SetupItem
        title="Sign in with a Google account that has access to your Firebase project."
        status="incomplete"
      >
        <Button
          startIcon={
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google logo"
              width="20"
              height="20"
            />
          }
          onClick={() => setComplete()}
        >
          Sign in with Google
        </Button>
      </SetupItem>
    </>
  );
}