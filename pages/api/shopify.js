
export default async function shopifyUrl(req, res) {

    res.status(200).json(process.env.NEXT_PUBLIC_SHOPIFY_URL)
}
/*export async function shopifyAccessToken(req, res) {
    res.status(200).json(process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKRN)
}*/
