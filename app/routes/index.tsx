import type { LoaderFunction } from "remix";
import { json, useLoaderData } from "remix";

export let loader: LoaderFunction = ({ request }) => {
	let cf = (request as any).cf as IncomingRequestCfProperties;

	return json({
		currentLocation: {
			city: cf.city,
			region: cf.region,
			country: cf.country,
		},
	});
};

export default function Index() {
	let { currentLocation } = useLoaderData();

	return (
		<main>
			<h1>Geolocation</h1>

			<p>
				Show localized content based on information avaliable in the <code>Request.cf</code> object.
			</p>

			<pre>{JSON.stringify(currentLocation, null, 2)}</pre>
		</main>
	);
}
