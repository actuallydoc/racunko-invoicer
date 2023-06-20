import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

const FeaturesCard: React.FC = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Features</CardTitle>
                <CardDescription>Manage your Features here.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className='space-x-10'>
                    <div className='mt-5'>
                        <ul className="space-y-2 list-inside list-disc hover:translate-x-2 duration-500">
                            <li>Invoice management</li>
                            <li>Customer management</li>
                            <li>Product management</li>
                            <li>Service management</li>
                            <li>Reports</li>
                            <li>Multi-user support</li>
                            <li>Dark mode</li>
                            <li>Mobile friendly</li>
                            <li>Responsive</li>
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default FeaturesCard