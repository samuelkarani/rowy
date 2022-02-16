import { useSnackbar } from "notistack";
import type { ISetupStep, ISetupStepBodyProps } from "../types";

import { Typography, Button, Grid } from "@mui/material";
import CopyIcon from "@src/assets/icons/Copy";
import InlineOpenInNewIcon from "@src/components/InlineOpenInNewIcon";
import DoneIcon from "@mui/icons-material/Done";

import SetupItem from "../SetupItem";

import { useAppContext } from "@src/contexts/AppContext";
import {
  RULES_START,
  RULES_END,
  REQUIRED_RULES,
} from "@src/config/storageRules";

export default {
  id: "storageRules",
  shortTitle: "Storage Rules",
  title: "Set up Firebase Storage Rules",
  body: StepStorageRules,
} as ISetupStep;

const rules = RULES_START + REQUIRED_RULES + RULES_END;

function StepStorageRules({ isComplete, setComplete }: ISetupStepBodyProps) {
  const { projectId } = useAppContext();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <>
      <Typography variant="inherit">
        Image and File fields store files in Firebase Storage. Your users will
        need read and write access.
      </Typography>

      <SetupItem
        status="incomplete"
        title="Add the following rules to allow users to access Firebase Storage:"
      >
        <Typography
          component="pre"
          sx={{
            width: "100%",
            height: 250,
            resize: "both",
            overflow: "auto",

            "& .comment": { color: "info.dark" },
          }}
          dangerouslySetInnerHTML={{
            __html: rules.replace(
              /(\/\/.*$)/gm,
              `<span class="comment">$1</span>`
            ),
          }}
        />

        <div>
          <Grid container spacing={1}>
            <Grid item>
              <Button
                startIcon={<CopyIcon />}
                onClick={() => {
                  navigator.clipboard.writeText(rules);
                  enqueueSnackbar("Copied to clipboard");
                }}
              >
                Copy to clipboard
              </Button>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color="primary"
                href={`https://console.firebase.google.com/project/${
                  projectId || "_"
                }/firestore/rules`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Set up in Firebase Console
                <InlineOpenInNewIcon />
              </Button>
            </Grid>
          </Grid>
        </div>
      </SetupItem>

      <SetupItem
        title={
          isComplete ? (
            "Marked as done"
          ) : (
            <Button
              variant="contained"
              color="primary"
              startIcon={<DoneIcon />}
              onClick={() => setComplete()}
              sx={{ mt: -0.5 }}
            >
              Mark as done
            </Button>
          )
        }
        status={isComplete ? "complete" : "incomplete"}
      />
    </>
  );
}