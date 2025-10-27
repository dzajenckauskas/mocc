/* eslint-disable jsx-a11y/alt-text */
import {
    Document,
    Font,
    Image,
    Link,
    Page,
    StyleSheet,
    Text, View
} from "@react-pdf/renderer"
import React from "react"
import LogoPDF from "../LogoPDF"
import { ProductViewData } from "../pages/ProductViewPage.types"
import { theme } from "../theme"
import ProductDiagnosesTablePDF from "./ProductDiagnosesTablePDF"

// const base = 'http://localhost:3000'
const base = process.env.NEXT_PUBLIC_URL || 'http://localhost:3003'
const url = (f: string) => `${base.replace(/\/+$/, '')}/fonts/${f}`

try {
    Font.register({
        family: 'OpenSans',
        fonts: [
            { src: url('OpenSans-Regular.ttf'), fontWeight: 400, fontStyle: 'normal' },
            { src: url('OpenSans-Italic.ttf'), fontWeight: 400, fontStyle: 'italic' },
            { src: url('OpenSans-Bold.ttf'), fontWeight: 700, fontStyle: 'normal' },
            { src: url('OpenSans-BoldItalic.ttf'), fontWeight: 700, fontStyle: 'italic' },
        ],
    })
    // disable hyphenation to avoid awkward word breaks
    Font.registerHyphenationCallback(word => [word])
} catch (e) {
    // swallow — we will fall back to Helvetica via styles
    // console.warn('OpenSans could not be registered, using Helvetica fallback', e)
}

const styles = StyleSheet.create({
    page: {
        paddingTop: 36,
        // more bottom padding so content doesn't overlap fixed footer
        paddingBottom: 96,
        paddingHorizontal: 36,
        fontFamily: 'OpenSans',
        fontSize: 9,
        color: '#1f2937'
    },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    logoWrap: { width: 140 },
    brand: { fontSize: 9, fontWeight: 700, },
    breadcrumb: { textDecoration: 'none', fontSize: 8, color: theme.palette.secondary.main },

    hero: { flexDirection: 'row', marginTop: 20 },
    imageBox: {
        width: '48%',
        height: 220,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        // borderWidth: 1, borderStyle: 'solid',
        // borderColor: theme.palette.divider,
        overflow: 'hidden',
        marginRight: '4%',
    },
    image: { width: '100%', height: '100%', objectFit: 'contain' },
    details: { width: '48%' },

    h1: { fontSize: 12, textTransform: 'uppercase', marginBottom: 6, fontWeight: 700 },
    label: { fontSize: 7, color: theme.palette.primary.main },
    value: { fontSize: 9, color: theme.palette.secondary.main, fontWeight: 700, marginBottom: 4 },
    body: {
        fontSize: 9, color: theme.palette.secondary.main,
        textAlign: 'left',
        lineHeight: 1.35
    },
    sectionTitle: { fontSize: 9, fontWeight: 700, marginBottom: 6, textTransform: 'uppercase' },
    notes: { fontStyle: 'italic', color: theme.palette.primary.main, fontSize: 8 },

    table: {
        flexDirection: 'column',
        width: 'auto',
        borderWidth: 1, borderStyle: 'solid', borderColor: theme.palette.divider,
        overflow: 'hidden'
    },
    tableRow: { flexDirection: 'row' },
    tableHeaderCell: {
        backgroundColor: '#f3f4f6',
        padding: 6, fontSize: 9, fontWeight: 700,
        borderRightWidth: 1, borderRightColor: theme.palette.divider
    },
    tableCell: {
        padding: 6, fontSize: 9,
        borderRightWidth: 1, borderRightColor: theme.palette.divider
    },

    footer: {
        position: 'absolute',
        bottom: 24, left: 36, right: 36,
        flexDirection: 'row', justifyContent: 'space-between',
        fontSize: 8, color: theme.palette.secondary.main
    }
})

const ProductPage: React.FC<{ product: ProductViewData; index: number; brand?: string; baseUrl?: string }> = ({ product, brand = 'Katalogas', baseUrl }) => {
    const imageUrl = product?.image?.url
    return (
        <Page size="A4" style={styles.page} wrap>
            <View style={styles.header} fixed>
                <View style={styles.logoWrap}>
                    <LogoPDF
                    />
                </View>
                <Link href={product.categorySlug && baseUrl ? `${baseUrl}/ortopedijos-technika/${product.categorySlug}` : ''}>
                    <Text style={styles.breadcrumb}>
                        {product.categoryTitle ? `${product.categoryTitle}` : ''}
                    </Text>
                </Link>
            </View>

            <View style={styles.hero}>
                <View style={styles.imageBox}>
                    {imageUrl ? <Image src={imageUrl} style={styles.image} /> : <Text>No image</Text>}
                </View>

                <View style={styles.details}>
                    <Text style={styles.h1}>{product.title}</Text>

                    {product.categoryTitle ? (
                        <View>
                            <Text style={styles.label}>KATEGORIJA</Text>
                            <Text style={styles.value}>{product.categoryTitle}</Text>
                        </View>
                    ) : null}

                    {/* {product.prices !== undefined && product.prices !== null && `${product.prices}`.length > 0 ? (
                        <View>
                            <Text style={styles.label}>KAINOS</Text>
                            <Text style={styles.value}>{`${product.prices}€`}</Text>
                        </View>
                    ) : null} */}

                    {product.type ? (
                        <View>
                            <Text style={styles.label}>TIPAS</Text>
                            <Text style={styles.value}>{product.type}</Text>
                        </View>
                    ) : null}

                    {product.description ? (
                        <View style={{ marginTop: 8 }}>
                            <Text style={[styles.sectionTitle, { marginBottom: 4 }]}>Techninis aprašymas ir paskirtis</Text>
                            <Text style={[styles.body, { textAlign: 'justify' }]}>{product.description}</Text>
                        </View>
                    ) : null}
                </View>
            </View>
            <ProductDiagnosesTablePDF diagnoses={product.diagnosesTable} />

            {product.notes && product.notes.length > 0 ? (
                <View style={{ marginTop: 10 }} wrap>
                    {product.notes.map((n) => (
                        <Text key={n.id} style={styles.notes}>{n.text}</Text>
                    ))}
                </View>
            ) : null}
            <View style={styles.footer} fixed>
                <Link style={{ color: theme.palette.secondary.main }} href={`${baseUrl}`}>
                    <Text>{brand}</Text>
                </Link>
                <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
            </View>
        </Page>
    )
}

export const ProductCatalogDocument: React.FC<{
    products: ProductViewData[]
    brand?: string
    baseUrl?: string
}> = ({ products, brand = 'Katalogas', baseUrl }) => {
    return (
        <Document title={`Ortopedijos technikos katalogas - ${brand}`} author={brand}>
            {products.map((p, idx) => (
                <ProductPage key={String(p.id) + '-' + idx} product={p} index={idx} brand={brand} baseUrl={baseUrl} />
            ))}
        </Document>
    )
}
