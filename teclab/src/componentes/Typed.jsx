import React from "react";
import { ReactTyped } from "react-typed";

export const Typed = () => {
	return (
		<>
			<h1 className="comprar_title">
				Medialunas{" "}
				<ReactTyped
					strings={["Clasicas", "Especiales"]}
					startDelay={800}
					backDelay={1000}
					typeSpeed={75}
					backSpeed={75}
					loop
					style={{
						color: "#f09491",
					}}
				/>
			</h1>
		</>
	);
};
