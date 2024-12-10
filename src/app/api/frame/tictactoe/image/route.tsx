import { ImageResponse } from "next/og";
import { GameState } from "~/types/game";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const stateParam = searchParams.get("state");
  const state: GameState = stateParam ? JSON.parse(decodeURIComponent(stateParam)) : null;

  if (!state?.gameStarted) {
    return new ImageResponse(
      (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#1a1a1a",
          color: "white",
          padding: "40px",
        }}>
          <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>Tic-Tac-Toe</h1>
          <p style={{ fontSize: "24px" }}>Click to Start Game</p>
        </div>
      ),
      {
        width: 600,
        height: 400,
      }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#1a1a1a",
          color: "#ffffff",
          fontFamily: "sans-serif",
          padding: "20px",
        }}
      >
        <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>
          POD Play Tic-Tac-Toe
        </h1>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
          width: "300px",
          marginBottom: "20px"
        }}>
          {state?.board.map((cell, i) => (
            <div key={i} style={{
              width: "100px",
              height: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "48px",
              border: "2px solid #7C65C1",
              borderRadius: "8px",
            }}>
              {cell || ""}
            </div>
          ))}
        </div>

        <div style={{ fontSize: "24px", textAlign: "center" }}>
          {state?.winner
            ? state.winner === "draw"
              ? "It's a draw!"
              : `Player ${state.winner} wins!`
            : `Player ${state?.currentPlayer}'s turn`}
        </div>
      </div>
    ),
    {
      width: 600,
      height: 600,
    }
  );
} 