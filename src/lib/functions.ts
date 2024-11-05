export async function fetchNavbarData() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/navbar/getnavbarinfodataopen`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const responseData: any = await response.json();
    return responseData.Items;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function getActualJobs() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/actualjobs/getactualjobsopen`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    return responseData.Items;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function getActualThreeEvents() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/events/getactualeventsthree`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function fetchBlogs(limit: number) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/blogs/getblogsopen/${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();

    return responseData.Items;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function getAboutUsData() {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/admin/aboutus/getaboutuspageopen/sdfg5s4fd5g-asdfasdf-5465`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function fetchBlogBySlug(slug: string) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/blogs/getblogopen/${slug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    if (responseData != null) {
      return responseData;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function fetchSimiliarBlogBySlug(slug: string) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/blogs/getblogsexcept/${slug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();

    if (responseData != null) {
      return responseData;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function fetchFaqDataClient() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/faq/getfaqdataopen`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    return responseData.Items;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function fetchUnionDataClient() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/union/getuniondataopen`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const responseData = await response.json();
    return responseData.Items;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function fetchArchiveByYear(year: string | undefined) {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/admin/archive/getarchivebyearopen/${year}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();

    if (responseData != null) {
      return responseData;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
