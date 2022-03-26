import type { LoaderFunction } from "remix";
import { json, useLoaderData } from "remix";
import countries from "../lib/countries.json";

export let loader: LoaderFunction = ({ request }) => {
	let cf = (request as any).cf as IncomingRequestCfProperties;

	let country = countries.find(c => c.cca2 === cf.country);

	let formattedLocation = "";
	if (cf.city) formattedLocation += cf.city + ", ";
	if (cf.region) formattedLocation += cf.region + ", ";
	formattedLocation += cf.country;

	return json({
		formattedLocation,
		country,
	});
};

export default function Index() {
	let { formattedLocation, country } = useLoaderData();

	return (
		<main>
			<h1>Geolocation</h1>

			<p>
				Show localized content based on information avaliable in the <code>Request.cf</code> object.
			</p>

			<p>
				Location: {formattedLocation} {country.flag}
			</p>

			<p>Currencies</p>
			<ul>
				{Object.entries(country.currencies).map(([abbr, currency]: any) => (
					<li key={abbr}>
						{abbr}: {currency.name} ({currency.symbol})
					</li>
				))}
			</ul>
			<p>Languages</p>
			<ul>
				{Object.values(country.languages).map((name: any) => (
					<li key={name}>{name}</li>
				))}
			</ul>
		</main>
	);
}
