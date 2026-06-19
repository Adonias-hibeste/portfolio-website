import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
        fontFamily: "Helvetica",
        paddingTop: 28,
        paddingBottom: 28,
        paddingLeft: 38,
        paddingRight: 38,
    },
    // ── Header ──────────────────────────────────────────────
    header: {
        marginBottom: 10,
        textAlign: "center",
    },
    headerName: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#000000",
        marginBottom: 2,
        letterSpacing: 1,
    },
    headerTitle: {
        fontSize: 11,
        color: "#444444",
        marginBottom: 5,
        letterSpacing: 0.3,
    },
    headerContact: {
        fontSize: 9.5,
        color: "#333333",
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
    },
    contactLink: {
        color: "#333333",
        textDecoration: "none",
    },
    separatorDot: {
        marginHorizontal: 6,
        color: "#999999",
    },
    // ── Section ──────────────────────────────────────────────
    section: {
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 10.5,
        fontWeight: "bold",
        textTransform: "uppercase",
        color: "#000000",
        borderBottomWidth: 0.75,
        borderBottomColor: "#000000",
        paddingBottom: 2,
        marginBottom: 7,
        letterSpacing: 0.8,
    },
    // ── Experience item ──────────────────────────────────────
    itemWrapper: {
        marginBottom: 9,
    },
    itemHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 1,
    },
    itemTitleBlock: {
        flex: 1,
        paddingRight: 8,
    },
    itemCompany: {
        fontSize: 11,
        fontWeight: "bold",
        color: "#000000",
    },
    itemPosition: {
        fontSize: 10,
        fontStyle: "italic",
        color: "#222222",
        marginBottom: 1,
    },
    itemTagline: {
        fontSize: 9,
        color: "#555555",
        marginBottom: 3,
    },
    itemDateLocation: {
        fontSize: 9,
        color: "#444444",
        textAlign: "right",
    },
    // ── Bullets ──────────────────────────────────────────────
    bulletRow: {
        flexDirection: "row",
        marginBottom: 2.5,
        paddingLeft: 4,
    },
    bulletDot: {
        width: 10,
        fontSize: 9.5,
        color: "#444444",
        marginTop: 0.5,
    },
    bulletText: {
        flex: 1,
        fontSize: 9.5,
        lineHeight: 1.4,
        color: "#222222",
    },
    // ── Skills ───────────────────────────────────────────────
    skillsText: {
        fontSize: 9.5,
        color: "#222222",
        lineHeight: 1.5,
    },
    // ── Education ────────────────────────────────────────────
    itemTitle: {
        fontSize: 10.5,
        fontWeight: "bold",
        color: "#000000",
    },
    itemSubtitle: {
        fontSize: 9.5,
        fontStyle: "italic",
        color: "#333333",
    },
    // ── Summary ──────────────────────────────────────────────
    summaryText: {
        fontSize: 9.5,
        lineHeight: 1.5,
        color: "#222222",
        textAlign: "justify",
    },
});

interface CVData {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    website?: string | null;
    github?: string | null;
    linkedin?: string | null;
    telegram?: string | null;
    skills: { name: string }[];
    projects?: {
        title: string;
        description: string;
        technologies: string[];
        liveLink?: string;
        githubLink?: string;
    }[];
    experiences: {
        position: string;
        company: string;
        location?: string;
        startDate: string;
        endDate?: string;
        current: boolean;
        description: string;
    }[];
    educations: {
        institution: string;
        degree: string;
        field: string;
        location?: string;
        startDate?: string;
        endDate?: string;
        current?: boolean;
        description?: string;
    }[];
}

/** Parse description: first paragraph is the tagline, then bullet lines starting with • */
function parseDescription(description: string): { tagline: string; bullets: string[] } {
    const lines = description.split('\n').map(l => l.trim()).filter(Boolean);
    const tagline = lines[0] && !lines[0].startsWith('•') ? lines[0] : '';
    const bullets = lines
        .filter(l => l.startsWith('•'))
        .map(l => l.replace(/^•\s*/, '').trim());
    return { tagline, bullets };
}

function formatMonthYear(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export const CVTemplate = ({ data }: { data: CVData }) => {
    // Build contact items
    const contactParts: React.ReactNode[] = [];
    if (data.location) contactParts.push(<Text key="loc">{data.location}</Text>);
    if (data.phone) contactParts.push(<Text key="phone">{data.phone}</Text>);
    if (data.email) {
        contactParts.push(
            <Link src={`mailto:${data.email}`} style={styles.contactLink} key="email">
                {data.email}
            </Link>
        );
    }
    if (data.linkedin) {
        const cleanLinkedin = data.linkedin.replace(/^https?:\/\//, '');
        contactParts.push(
            <Link src={data.linkedin} style={styles.contactLink} key="linkedin">
                {cleanLinkedin}
            </Link>
        );
    }
    if (data.github) {
        const cleanGh = data.github.replace(/^https?:\/\//, '');
        contactParts.push(
            <Link src={data.github} style={styles.contactLink} key="github">
                {cleanGh}
            </Link>
        );
    }
    if (data.website) {
        const cleanWeb = data.website.replace(/^https?:\/\//, '');
        contactParts.push(
            <Link src={data.website} style={styles.contactLink} key="web">
                {cleanWeb}
            </Link>
        );
    }

    const skillNames = data.skills.map(s => s.name).join(' • ');

    return (
        <Document title={`${data.name} — CV`} author={data.name}>
            <Page size="A4" style={styles.page}>

                {/* ── HEADER ── */}
                <View style={styles.header}>
                    <Text style={styles.headerName}>{data.name.toUpperCase()}</Text>
                    <Text style={styles.headerTitle}>{data.title}</Text>
                    <View style={styles.headerContact}>
                        {contactParts.map((item, i) => (
                            <View key={i} style={{ flexDirection: "row", alignItems: "center" }}>
                                {item}
                                {i < contactParts.length - 1 && (
                                    <Text style={styles.separatorDot}>|</Text>
                                )}
                            </View>
                        ))}
                    </View>
                </View>

                {/* ── PROFESSIONAL SUMMARY ── */}
                {data.summary && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Professional Summary</Text>
                        <Text style={styles.summaryText}>{data.summary}</Text>
                    </View>
                )}

                {/* ── TECHNICAL SKILLS ── */}
                {data.skills && data.skills.length > 0 && (
                    <View style={[styles.section, { marginBottom: 8 }]}>
                        <Text style={styles.sectionTitle}>Technical Skills</Text>
                        <Text style={styles.skillsText}>{skillNames}</Text>
                    </View>
                )}

                {/* ── PROFESSIONAL EXPERIENCE ── */}
                {data.experiences && data.experiences.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Professional Experience</Text>
                        {data.experiences.map((exp, index) => {
                            const { tagline, bullets } = parseDescription(exp.description);
                            const dateRange = `${formatMonthYear(exp.startDate)} – ${exp.current ? 'Present' : (exp.endDate ? formatMonthYear(exp.endDate) : '')}`;
                            return (
                                <View key={index} style={styles.itemWrapper} wrap={false}>
                                    <View style={styles.itemHeader}>
                                        <View style={styles.itemTitleBlock}>
                                            <Text style={styles.itemCompany}>{exp.company}</Text>
                                            <Text style={styles.itemPosition}>{exp.position}</Text>
                                        </View>
                                        <View>
                                            {exp.location && (
                                                <Text style={styles.itemDateLocation}>{exp.location}</Text>
                                            )}
                                            <Text style={styles.itemDateLocation}>{dateRange}</Text>
                                        </View>
                                    </View>
                                    {tagline ? (
                                        <Text style={styles.itemTagline}>{tagline}</Text>
                                    ) : null}
                                    {bullets.map((bullet, bi) => (
                                        <View key={bi} style={styles.bulletRow}>
                                            <Text style={styles.bulletDot}>•</Text>
                                            <Text style={styles.bulletText}>{bullet}</Text>
                                        </View>
                                    ))}
                                </View>
                            );
                        })}
                    </View>
                )}

                {/* ── EDUCATION ── */}
                {data.educations && data.educations.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Education</Text>
                        {data.educations.map((edu, index) => (
                            <View key={index} style={[styles.itemWrapper, { marginBottom: 4 }]}>
                                <View style={styles.itemHeader}>
                                    <View style={styles.itemTitleBlock}>
                                        <Text style={styles.itemTitle}>{edu.institution}</Text>
                                        <Text style={styles.itemSubtitle}>
                                            {edu.degree} in {edu.field}
                                        </Text>
                                    </View>
                                    <View>
                                        {(edu.startDate || edu.endDate) && (
                                            <Text style={styles.itemDateLocation}>
                                                {edu.startDate ? new Date(edu.startDate).getFullYear() : ''}
                                                {edu.startDate && (edu.endDate || edu.current) ? ' – ' : ''}
                                                {edu.current ? 'Present' : (edu.endDate ? new Date(edu.endDate).getFullYear() : '')}
                                            </Text>
                                        )}
                                        {edu.location && (
                                            <Text style={styles.itemDateLocation}>{edu.location}</Text>
                                        )}
                                    </View>
                                </View>
                                {edu.description && (
                                    <Text style={[styles.summaryText, { marginTop: 2 }]}>{edu.description}</Text>
                                )}
                            </View>
                        ))}
                    </View>
                )}

            </Page>
        </Document>
    );
};
