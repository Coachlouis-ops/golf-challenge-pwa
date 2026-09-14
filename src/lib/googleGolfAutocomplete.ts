export type GolfCoursePlace = {
  name: string;
  stateProvince: string;
  country: string;
};

let googlePlacesPromise: Promise<void> | null = null;

function waitForGooglePlaces(
  timeoutMs = 10000
): Promise<void> {
  return new Promise((resolve, reject) => {
    const startedAt = Date.now();

    const check = () => {
      const google =
        (window as any).google;

      if (
        google?.maps?.places
      ) {
        resolve();
        return;
      }

      if (
        Date.now() - startedAt >= timeoutMs
      ) {
        reject(
          new Error(
            "Google Places did not become available."
          )
        );
        return;
      }

      window.setTimeout(
        check,
        100
      );
    };

    check();
  });
}

function loadGooglePlaces(): Promise<void> {
  if (
    typeof window === "undefined"
  ) {
    return Promise.reject(
      new Error(
        "Google Places can only load in the browser."
      )
    );
  }

  if (
    (window as any).google?.maps?.places
  ) {
    return Promise.resolve();
  }

  if (googlePlacesPromise) {
    return googlePlacesPromise;
  }

  googlePlacesPromise = new Promise(
    (resolve, reject) => {
      const scriptId =
        "google-maps-script";

      const existingScript =
        document.getElementById(
          scriptId
        ) as HTMLScriptElement | null;

      const resolveWhenReady =
        async () => {
          try {
            await waitForGooglePlaces();
            resolve();
          } catch (error) {
            googlePlacesPromise = null;
            reject(error);
          }
        };

      if (existingScript) {
        resolveWhenReady();
        return;
      }

      const apiKey =
        process.env
          .NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

      if (!apiKey) {
        googlePlacesPromise = null;

        reject(
          new Error(
            "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is missing."
          )
        );

        return;
      }

      const script =
        document.createElement(
          "script"
        );

      script.id =
        scriptId;

      script.src =
        "https://maps.googleapis.com/maps/api/js?key=" +
        encodeURIComponent(
          apiKey
        ) +
        "&libraries=places&v=weekly";

      script.async = true;
      script.defer = true;

      script.onload = () => {
        resolveWhenReady();
      };

      script.onerror = () => {
        googlePlacesPromise = null;

        reject(
          new Error(
            "Google Maps failed to load."
          )
        );
      };

      document.head.appendChild(
        script
      );
    }
  );

  return googlePlacesPromise;
}

export async function attachGolfCourseAutocomplete(
  input: HTMLInputElement,
  onSelect: (
    place: GolfCoursePlace
  ) => void
) {
  await loadGooglePlaces();

  const google =
    (window as any).google;

  if (
    !google?.maps?.places
  ) {
    throw new Error(
      "Google Places is unavailable."
    );
  }

  const autocomplete =
    new google.maps.places.Autocomplete(
      input,
      {
        types: [
          "establishment",
        ],

        fields: [
          "name",
          "types",
          "address_components",
        ],
      }
    );

  const listener =
    autocomplete.addListener(
      "place_changed",
      () => {
        const place =
          autocomplete.getPlace();

        if (
          !place?.name
        ) {
          return;
        }

        const name =
          String(
            place.name
          );

        const lowerName =
          name.toLowerCase();

        const placeTypes =
          place.types || [];

        const isGolfRelated =
          placeTypes.includes(
            "golf_course"
          ) ||
          lowerName.includes(
            "golf"
          ) ||
          lowerName.includes(
            "country club"
          );

        if (
          !isGolfRelated
        ) {
          alert(
            "Please select a golf course, golf club or country club."
          );

          input.value = "";
          return;
        }

        let stateProvince = "";
        let country = "";

        if (
          place.address_components
        ) {
          place.address_components.forEach(
            (
              component: any
            ) => {
              if (
                component.types.includes(
                  "administrative_area_level_1"
                )
              ) {
                stateProvince =
                  component.long_name;
              }

              if (
                component.types.includes(
                  "country"
                )
              ) {
                country =
                  component.long_name;
              }
            }
          );
        }

        onSelect({
          name,
          stateProvince,
          country,
        });
      }
    );

  return () => {
    if (
      listener &&
      google.maps.event
    ) {
      google.maps.event.removeListener(
        listener
      );
    }
  };
}