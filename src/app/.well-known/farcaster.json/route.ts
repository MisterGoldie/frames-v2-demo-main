export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_URL;

  const config = {
    accountAssociation: {
      header:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
      payload: "eyJkb21haW4iOiJwb2RwbGF5djIudmVyY2VsLmFwcCJ9",
      signature:
        "MHhlM2MxZmVlMjcxYTY4YWNjYTI3NzM2ZGExNGJkN2YyMWQ5NDJiMzc3NjU1Mzk5NTU2Y2ZmNWFmMmMxODBlMGE4MWU2ZmVkMTMyNzljZmIyNDA2OTI5ODJjMzRlNWQ5MmE5NGM1NjRjYzVjODlmMTQ3Y2Y3ZTQxYWY0MGJmOWQ3YjFi",
    },
    frame: {
      version: "0.0.0",
      name: "POD Play v2",
      iconUrl: `${appUrl}/icon.png`,
      splashImageUrl: `${appUrl}/splash.png`,
      splashBackgroundColor: "#f7f7f7",
      homeUrl: appUrl,
    },
  };

  return Response.json(config);
}
