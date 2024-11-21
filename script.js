// Define the image bounds
const imageBounds = [[37.7749, -122.4194], [37.7849, -122.4094]]; // Adjust bounds to fit your image

// Initialize the map with max and min zoom levels and set bounds
const map = L.map('map', {
    maxZoom: 23, // Set max zoom level
    minZoom: 18, // Set min zoom level to ensure the map is always in view
    maxBounds: imageBounds, // Set bounds to prevent scrolling off to the distance
    maxBoundsViscosity: 1.0 // Prevents the user from dragging the map out of bounds
}).setView([37.77956, -122.41596], 16); // Set initial view to a panned inwards location

// Add the image overlay and fit it to the map bounds
const imageUrl = 'Site-Plan.png';
L.imageOverlay(imageUrl, imageBounds).addTo(map);
map.fitBounds(imageBounds); // Ensure the image is always in fullscreen view

// Waypoints data
const waypoints = [
    { lat: 37.77956, lng: -122.41596, text: 'Engineering Building', imageUrl: 'engineering.png' },
    { lat: 37.78159, lng: -122.41450, text: 'Gym', imageUrl: 'gym.jpg' },
    { lat: 37.78154, lng: -122.41376, text: 'Foyer', imageUrl: 'foyer.jpg' },
    { lat: 37.78087, lng: -122.41204, text: 'Field', imageUrl: 'field.jpg' },
    { lat: 37.78252, lng: -122.41565, text: 'Lower School', imageUrl: 'lower_school.jpg' },
    { lat: 37.77972, lng: -122.41665, text: 'Villa', imageUrl: 'villa.jpg' }
];

// Add waypoints to the map
waypoints.forEach(waypoint => {
    const marker = L.marker([waypoint.lat, waypoint.lng]).addTo(map);
    marker.on('click', () => {
        document.getElementById('modal-text').innerText = waypoint.text;
        const modalImage = document.getElementById('modal-image');
        if (waypoint.imageUrl) {
            modalImage.src = waypoint.imageUrl;
            modalImage.style.display = 'block';
        } else {
            modalImage.style.display = 'none';
        }
        document.getElementById('modal').style.display = 'block';
    });

    // Add a small text label next to the marker
    const label = L.divIcon({
        className: 'waypoint-label',
        html: `<span>${waypoint.text}</span>`,
        iconSize: [100, 40]
    });
    L.marker([waypoint.lat, waypoint.lng], { icon: label }).addTo(map);
});

// Initialize the graph
const graph = {};

// Initialize graph with waypoints
waypoints.forEach(waypoint => {
    graph[waypoint.text] = {};
});

// Function to add edges to the graph
function addEdge(from, to) {
    const fromWaypoint = waypoints.find(wp => wp.text === from) || walkablePoints.find(wp => wp.text === from);
    const toWaypoint = waypoints.find(wp => wp.text === to) || walkablePoints.find(wp => wp.text === to);
    
    if (!fromWaypoint || !toWaypoint) {
        console.error(`Cannot find waypoint for '${from}' or '${to}'`);
        return;
    }
    
    const distance = L.latLng(fromWaypoint.lat, fromWaypoint.lng).distanceTo(L.latLng(toWaypoint.lat, toWaypoint.lng));
    graph[fromWaypoint.text] = graph[fromWaypoint.text] || {};
    graph[toWaypoint.text] = graph[toWaypoint.text] || {};
    graph[fromWaypoint.text][toWaypoint.text] = distance;
    graph[toWaypoint.text][fromWaypoint.text] = distance;
}

// Walkable points data
const walkablePoints = [
    {"lat":37.78075426810231,"lng":-122.41690590977672,"text":"Point_0_0"},
    {"lat":37.780683250983316,"lng":-122.41616964340211,"text":"Point_0_1"},
    {"lat":37.78071292978759,"lng":-122.41579949855806,"text":"Point_0_2"},
    {"lat":37.78070021030149,"lng":-122.41549372673036,"text":"Point_0_3"},
    {"lat":37.781433697090115,"lng":-122.4153381586075,"text":"Point_0_4"},
    {"lat":37.782167176600076,"lng":-122.41530060768129,"text":"Point_0_5"},
    {"lat":37.783210146490966,"lng":-122.41523623466493,"text":"Point_0_6"},
    {"lat":37.783494204846136,"lng":-122.41485536098482,"text":"Point_0_7"},
    {"lat":37.783282221102354,"lng":-122.41449594497682,"text":"Point_0_8"},
    {"lat":37.78352812218871,"lng":-122.41434574127199,"text":"Point_0_9"},
    {"lat":37.78361715513895,"lng":-122.41399705410004,"text":"Point_0_10"},
    {"lat":37.783595956827185,"lng":-122.41353571414949,"text":"Point_0_11"},
    {"lat":37.782904888534105,"lng":-122.41343915462495,"text":"Point_0_12"},
    {"lat":37.782298608575644,"lng":-122.41322994232179,"text":"Point_0_13"},
    {"lat":37.78205270339869,"lng":-122.41278469562532,"text":"Point_0_14"},
    {"lat":37.781815276934275,"lng":-122.41235554218294,"text":"Point_0_15"},
    {"lat":37.78167112478022,"lng":-122.4121516942978,"text":"Point_0_16"},
    {"lat":37.781696563416055,"lng":-122.41153478622438,"text":"Point_0_17"},
    {"lat":37.781696563416055,"lng":-122.41112709045412,"text":"Point_0_18"},
    {"lat":37.78156513036994,"lng":-122.41081595420839,"text":"Point_0_19"},
    {"lat":37.781938230019975,"lng":-122.41350889205934,"text":"Point_0_20"},
    {"lat":37.7812853043965,"lng":-122.41360008716585,"text":"Point_0_21"},
    {"lat":37.780717169615805,"lng":-122.4136108160019,"text":"Point_0_22"},
    {"lat":37.77998791558695,"lng":-122.41363227367403,"text":"Point_0_23"},
    {"lat":37.779491849141834,"lng":-122.41344988346101,"text":"Point_0_24"},
    {"lat":37.77914417665764,"lng":-122.41370201110841,"text":"Point_0_25"},
    {"lat":37.779212015319544,"lng":-122.41451203823091,"text":"Point_0_26"},
    {"lat":37.779496089040094,"lng":-122.4149411916733,"text":"Point_0_27"},
    {"lat":37.78008119266633,"lng":-122.41495192050935,"text":"Point_0_28"},
    {"lat":37.78033982395262,"lng":-122.41499483585359,"text":"Point_0_29"},
    {"lat":37.78040766151723,"lng":-122.41522014141084,"text":"Point_0_30"},
    {"lat":37.780377982590366,"lng":-122.41532206535341,"text":"Point_0_31"},
    {"lat":37.7796826443224,"lng":-122.41534888744356,"text":"Point_0_32"},
    {"lat":37.7789872995135,"lng":-122.41538107395174,"text":"Point_0_33"},
    {"lat":37.77936889198675,"lng":-122.41535961627962,"text":"Point_0_34"},
    {"lat":37.77989887826503,"lng":-122.4153381586075,"text":"Point_0_35"},
    {"lat":37.77988615863884,"lng":-122.41571366786958,"text":"Point_0_36"},
    {"lat":37.779920077637115,"lng":-122.41603553295137,"text":"Point_0_37"},
    {"lat":37.77991159788903,"lng":-122.41617500782014,"text":"Point_0_38"},
    {"lat":37.7795172885277,"lng":-122.4161857366562,"text":"Point_0_39"},
    {"lat":37.77907633793345,"lng":-122.41620719432832,"text":"Point_0_40"},
    {"lat":37.77909753754146,"lng":-122.41636276245119,"text":"Point_0_41"},
    {"lat":37.77944521024501,"lng":-122.41638958454134,"text":"Point_0_42"},
    {"lat":37.77975048249014,"lng":-122.4163842201233,"text":"Point_0_43"},
    {"lat":37.77946216984727,"lng":-122.41463005542757,"text":"Point_0_44"},
    {"lat":37.780670531492106,"lng":-122.41455495357515,"text":"Point_0_45"},
    {"lat":37.78069597047231,"lng":-122.41471052169801,"text":"Point_0_46"},
    {"lat":37.78203998414315,"lng":-122.41464078426363,"text":"Point_0_47"},
    {"lat":37.78146761537824,"lng":-122.41468369960786,"text":"Point_0_48"},
    {"lat":37.78237916354194,"lng":-122.41463005542757,"text":"Point_0_49"},
    {"lat":37.782383403274565,"lng":-122.41448521614076,"text":"Point_0_50"},
    {"lat":37.78294304584767,"lng":-122.41445839405061,"text":"Point_0_51"},
    {"lat":37.781344661509685,"lng":-122.41503775119781,"text":"Point_0_52"},
    {"lat":37.78127258500889,"lng":-122.41469442844391,"text":"Point_0_53"},
    {"lat":37.78157784970721,"lng":-122.41596043109895,"text":"Point_0_54"},
    {"lat":37.78156513036994,"lng":-122.41564929485322,"text":"Point_0_55"},
    {"lat":37.78215445736423,"lng":-122.41600871086122,"text":"Point_0_56"},
    {"lat":37.782743779659725,"lng":-122.41600334644319,"text":"Point_0_57"},
    {"lat":37.78321438617593,"lng":-122.41595506668092,"text":"Point_0_58"},
    {"lat":37.78376554315098,"lng":-122.41598188877107,"text":"Point_0_59"},
    {"lat":37.784193746886835,"lng":-122.41611063480379,"text":"Point_0_60"},
    {"lat":37.78429125828187,"lng":-122.4163466691971,"text":"Point_0_61"},
    {"lat":37.78422766390839,"lng":-122.41647005081178,"text":"Point_0_62"},
    {"lat":37.783922410154055,"lng":-122.41648614406587,"text":"Point_0_63"},
    {"lat":37.78360867581498,"lng":-122.41652369499208,"text":"Point_0_64"},
    {"lat":37.78312535274052,"lng":-122.41649687290193,"text":"Point_0_65"},
    {"lat":37.782557232103244,"lng":-122.41651296615602,"text":"Point_0_66"},
    {"lat":37.782090861152184,"lng":-122.41656124591829,"text":"Point_0_67"},
    {"lat":37.78160328837516,"lng":-122.41663098335268,"text":"Point_0_68"},
    {"lat":37.781039395848325,"lng":-122.4166363477707,"text":"Point_0_69"},
    {"lat":37.781289544191885,"lng":-122.41319239139558,"text":"Point_0_70"},
    {"lat":37.78159904859778,"lng":-122.41316556930543,"text":"Point_0_71"},
    {"lat":37.78172200204317,"lng":-122.41356790065767,"text":"Point_0_72"}
];

// Build the graph from walkable points
walkablePoints.forEach(point => {
    graph[point.text] = graph[point.text] || {};
    walkablePoints.forEach(otherPoint => {
        if (point !== otherPoint) {
            const distance = L.latLng(point.lat, point.lng).distanceTo(L.latLng(otherPoint.lat, otherPoint.lng));
            graph[point.text][otherPoint.text] = distance;
        }
    });
});

// Manually drawn paths data
const manualPaths = [
    [
        { "lat": 37.780876162998204, "lng": -122.4120980501175, "text": "Field" },
        { "lat": 37.78206966240268, "lng": -122.41279542446138, "text": "Point_0_1" },
        { "lat": 37.782239252228536, "lng": -122.41317093372346, "text": "Point_0_2" },
        { "lat": 37.78215021761848, "lng": -122.4133747816086, "text": "Point_0_3" },
        { "lat": 37.78198486734382, "lng": -122.41343379020692, "text": "Point_0_4" },
        { "lat": 37.78160752815231, "lng": -122.41376101970674, "text": "Point_0_5" },
        { "lat": 37.78157360992839, "lng": -122.41376101970674, "text": "Foyer" }
    ],
    [
        { "lat": 37.78157360992839, "lng": -122.41376101970674, "text": "Foyer" },
        { "lat": 37.78160752815231, "lng": -122.41376101970674, "text": "Point_0_5" },
        { "lat": 37.78198486734382, "lng": -122.41343379020692, "text": "Point_0_4" },
        { "lat": 37.78215021761848, "lng": -122.4133747816086, "text": "Point_0_3" },
        { "lat": 37.782239252228536, "lng": -122.41317093372346, "text": "Point_0_2" },
        { "lat": 37.78206966240268, "lng": -122.41279542446138, "text": "Point_0_1" },
        { "lat": 37.780876162998204, "lng": -122.4120980501175, "text": "Field" }
    ],
    [
        { "lat": 37.7815630104802, "lng": -122.41376101970674, "text": "Foyer" },
        { "lat": 37.781611767929206, "lng": -122.41413652896883, "text": "Point_0_1" },
        { "lat": 37.78161600770584, "lng": -122.41449058055879, "text": "Gym" }
    ],
    [
        { "lat": 37.78161600770584, "lng": -122.41449058055879, "text": "Gym" },
        { "lat": 37.781611767929206, "lng": -122.41413652896883, "text": "Point_0_1" },
        { "lat": 37.7815630104802, "lng": -122.41376101970674, "text": "Foyer" }
    ],
    // Concatenated path from Field to Gym
    [
        { "lat": 37.780876162998204, "lng": -122.4120980501175, "text": "Field" },
        { "lat": 37.78206966240268, "lng": -122.41279542446138, "text": "Point_0_1" },
        { "lat": 37.782239252228536, "lng": -122.41317093372346, "text": "Point_0_2" },
        { "lat": 37.78215021761848, "lng": -122.4133747816086, "text": "Point_0_3" },
        { "lat": 37.78198486734382, "lng": -122.41343379020692, "text": "Point_0_4" },
        { "lat": 37.78160752815231, "lng": -122.41376101970674, "text": "Point_0_5" },
        { "lat": 37.78157360992839, "lng": -122.41376101970674, "text": "Foyer" },
        { "lat": 37.781611767929206, "lng": -122.41413652896883, "text": "Point_0_1" },
        { "lat": 37.78161600770584, "lng": -122.41449058055879, "text": "Gym" }
    ],
    // Concatenated path from Gym to Field
    [
        { "lat": 37.78161600770584, "lng": -122.41449058055879, "text": "Gym" },
        { "lat": 37.781611767929206, "lng": -122.41413652896883, "text": "Point_0_1" },
        { "lat": 37.78157360992839, "lng": -122.41376101970674, "text": "Foyer" },
        { "lat": 37.78160752815231, "lng": -122.41376101970674, "text": "Point_0_5" },
        { "lat": 37.78198486734382, "lng": -122.41343379020692, "text": "Point_0_4" },
        { "lat": 37.78215021761848, "lng": -122.4133747816086, "text": "Point_0_3" },
        { "lat": 37.782239252228536, "lng": -122.41317093372346, "text": "Point_0_2" },
        { "lat": 37.78206966240268, "lng": -122.41279542446138, "text": "Point_0_1" },
        { "lat": 37.780876162998204, "lng": -122.4120980501175, "text": "Field" }
    ],
    // Path from Engineering Building to Villa
    [
        { "lat": 37.77956710729966, "lng": -122.41594702005388, "text": "Engineering Building" },
        { "lat": 37.77964130540841, "lng": -122.41619512438777, "text": "Point_0_1" },
        { "lat": 37.77898305958608, "lng": -122.41626754403116, "text": "Point_0_2" },
        { "lat": 37.77901697899874, "lng": -122.4164378643036, "text": "Point_0_3" },
        { "lat": 37.77951198865635, "lng": -122.41646602749826, "text": "Point_0_4" },
        { "lat": 37.779718683356776, "lng": -122.41663768887521, "text": "Villa" }
    ],
    // Path from Villa to Engineering Building
    [
        { "lat": 37.779718683356776, "lng": -122.41663768887521, "text": "Villa" },
        { "lat": 37.77951198865635, "lng": -122.41646602749826, "text": "Point_0_4" },
        { "lat": 37.77901697899874, "lng": -122.4164378643036, "text": "Point_0_3" },
        { "lat": 37.77898305958608, "lng": -122.41626754403116, "text": "Point_0_2" },
        { "lat": 37.77964130540841, "lng": -122.41619512438777, "text": "Point_0_1" },
        { "lat": 37.77956710729966, "lng": -122.41594702005388, "text": "Engineering Building" }
    ],
    // Path from Foyer to Engineering Building
    [
        { "lat": 37.78153969168886, "lng": -122.4137704074383, "text": "Foyer" },
        { "lat": 37.78041190136295, "lng": -122.4136108160019, "text": "Point_0_1" },
        { "lat": 37.77982680035444, "lng": -122.41350352764131, "text": "Point_0_2" },
        { "lat": 37.77961480609239, "lng": -122.41345524787904, "text": "Point_0_3" },
        { "lat": 37.77944097034384, "lng": -122.41348743438722, "text": "Point_0_4" },
        { "lat": 37.77923745480172, "lng": -122.41360545158388, "text": "Point_0_5" },
        { "lat": 37.7792204951479, "lng": -122.41399168968202, "text": "Point_0_6" },
        { "lat": 37.779275614008526, "lng": -122.41439402103425, "text": "Point_0_7" },
        { "lat": 37.77938585160652, "lng": -122.414887547493, "text": "Point_0_8" },
        { "lat": 37.77984799974718, "lng": -122.41487681865694, "text": "Point_0_9" },
        { "lat": 37.78033558410275, "lng": -122.41488218307497, "text": "Point_0_10" },
        { "lat": 37.78054757629764, "lng": -122.41516113281251, "text": "Point_0_11" },
        { "lat": 37.78055181613535, "lng": -122.41571366786958, "text": "Point_0_12" },
        { "lat": 37.78033982395262, "lng": -122.41540253162384, "text": "Point_0_13" },
        { "lat": 37.78016598990908, "lng": -122.41532742977144, "text": "Point_0_14" },
        { "lat": 37.779958236491574, "lng": -122.41532742977144, "text": "Point_0_15" },
        { "lat": 37.779699603870185, "lng": -122.41532206535341, "text": "Point_0_16" },
        { "lat": 37.77986495925703, "lng": -122.41565465927125, "text": "Point_0_17" },
        { "lat": 37.779843759869124, "lng": -122.41598188877107, "text": "Point_0_18" },
        { "lat": 37.779623285874564, "lng": -122.41595506668092, "text": "Point_0_19" },
        { "lat": 37.77957240716703, "lng": -122.41595640778543, "text": "Point_0_20" },
        { "lat": 37.77956, "lng": -122.41596, "text": "Engineering Building" }
    ],
    // Concatenated path from Gym to Foyer to Engineering Building to Field
    [
        { "lat": 37.78161600770584, "lng": -122.41449058055879, "text": "Gym" },
        { "lat": 37.781611767929206, "lng": -122.41413652896883, "text": "Point_0_1" },
        { "lat": 37.7815630104802, "lng": -122.41376101970674, "text": "Foyer" },
        { "lat": 37.78041190136295, "lng": -122.4136108160019, "text": "Point_0_1" },
        { "lat": 37.77982680035444, "lng": -122.41350352764131, "text": "Point_0_2" },
        { "lat": 37.77961480609239, "lng": -122.41345524787904, "text": "Point_0_3" },
        { "lat": 37.77944097034384, "lng": -122.41348743438722, "text": "Point_0_4" },
        { "lat": 37.77923745480172, "lng": -122.41360545158388, "text": "Point_0_5" },
        { "lat": 37.7792204951479, "lng": -122.41399168968202, "text": "Point_0_6" },
        { "lat": 37.779275614008526, "lng": -122.41439402103425, "text": "Point_0_7" },
        { "lat": 37.77938585160652, "lng": -122.414887547493, "text": "Point_0_8" },
        { "lat": 37.77984799974718, "lng": -122.41487681865694, "text": "Point_0_9" },
        { "lat": 37.78033558410275, "lng": -122.41488218307497, "text": "Point_0_10" },
        { "lat": 37.78054757629764, "lng": -122.41516113281251, "text": "Point_0_11" },
        { "lat": 37.78055181613535, "lng": -122.41571366786958, "text": "Point_0_12" },
        { "lat": 37.78033982395262, "lng": -122.41540253162384, "text": "Point_0_13" },
        { "lat": 37.78016598990908, "lng": -122.41532742977144, "text": "Point_0_14" },
        { "lat": 37.779958236491574, "lng": -122.41532742977144, "text": "Point_0_15" },
        { "lat": 37.779699603870185, "lng": -122.41532206535341, "text": "Point_0_16" },
        { "lat": 37.77986495925703, "lng": -122.41565465927125, "text": "Point_0_17" },
        { "lat": 37.779843759869124, "lng": -122.41598188877107, "text": "Point_0_18" },
        { "lat": 37.779623285874564, "lng": -122.41595506668092, "text": "Point_0_19" },
        { "lat": 37.77957240716703, "lng": -122.41595640778543, "text": "Point_0_20" },
        { "lat": 37.77956, "lng": -122.41596, "text": "Engineering Building" },
    ],
    // Concatenated path from Field to Foyer to Engineering Building
    [
        { "lat": 37.780876162998204, "lng": -122.4120980501175, "text": "Field" },
        { "lat": 37.78206966240268, "lng": -122.41279542446138, "text": "Point_0_1" },
        { "lat": 37.782239252228536, "lng": -122.41317093372346, "text": "Point_0_2" },
        { "lat": 37.78215021761848, "lng": -122.4133747816086, "text": "Point_0_3" },
        { "lat": 37.78198486734382, "lng": -122.41343379020692, "text": "Point_0_4" },
        { "lat": 37.78160752815231, "lng": -122.41376101970674, "text": "Point_0_5" },
        { "lat": 37.78157360992839, "lng": -122.41376101970674, "text": "Foyer" },
        { "lat": 37.78153969168886, "lng": -122.4137704074383, "text": "Foyer" },
        { "lat": 37.78041190136295, "lng": -122.4136108160019, "text": "Point_0_1" },
        { "lat": 37.77982680035444, "lng": -122.41350352764131, "text": "Point_0_2" },
        { "lat": 37.77961480609239, "lng": -122.41345524787904, "text": "Point_0_3" },
        { "lat": 37.77944097034384, "lng": -122.41348743438722, "text": "Point_0_4" },
        { "lat": 37.77923745480172, "lng": -122.41360545158388, "text": "Point_0_5" },
        { "lat": 37.7792204951479, "lng": -122.41399168968202, "text": "Point_0_6" },
        { "lat": 37.779275614008526, "lng": -122.41439402103425, "text": "Point_0_7" },
        { "lat": 37.77938585160652, "lng": -122.414887547493, "text": "Point_0_8" },
        { "lat": 37.77984799974718, "lng": -122.41487681865694, "text": "Point_0_9" },
        { "lat": 37.78033558410275, "lng": -122.41488218307497, "text": "Point_0_10" },
        { "lat": 37.78054757629764, "lng": -122.41516113281251, "text": "Point_0_11" },
        { "lat": 37.78055181613535, "lng": -122.41571366786958, "text": "Point_0_12" },
        { "lat": 37.78033982395262, "lng": -122.41540253162384, "text": "Point_0_13" },
        { "lat": 37.78016598990908, "lng": -122.41532742977144, "text": "Point_0_14" },
        { "lat": 37.779958236491574, "lng": -122.41532742977144, "text": "Point_0_15" },
        { "lat": 37.779699603870185, "lng": -122.41532206535341, "text": "Point_0_16" },
        { "lat": 37.77986495925703, "lng": -122.41565465927125, "text": "Point_0_17" },
        { "lat": 37.779843759869124, "lng": -122.41598188877107, "text": "Point_0_18" },
        { "lat": 37.779623285874564, "lng": -122.41595506668092, "text": "Point_0_19" },
        { "lat": 37.77957240716703, "lng": -122.41595640778543, "text": "Point_0_20" },
        { "lat": 37.77956, "lng": -122.41596, "text": "Engineering Building" }
    ],
    // Concatenated path from Field to Foyer to Engineering Building to Villa
    [
        { "lat": 37.780876162998204, "lng": -122.4120980501175, "text": "Field" },
        { "lat": 37.78206966240268, "lng": -122.41279542446138, "text": "Point_0_1" },
        { "lat": 37.782239252228536, "lng": -122.41317093372346, "text": "Point_0_2" },
        { "lat": 37.78215021761848, "lng": -122.4133747816086, "text": "Point_0_3" },
        { "lat": 37.78198486734382, "lng": -122.41343379020692, "text": "Point_0_4" },
        { "lat": 37.78160752815231, "lng": -122.41376101970674, "text": "Point_0_5" },
        { "lat": 37.78157360992839, "lng": -122.41376101970674, "text": "Foyer" },
        { "lat": 37.78153969168886, "lng": -122.4137704074383, "text": "Foyer" },
        { "lat": 37.78041190136295, "lng": -122.4136108160019, "text": "Point_0_1" },
        { "lat": 37.77982680035444, "lng": -122.41350352764131, "text": "Point_0_2" },
        { "lat": 37.77961480609239, "lng": -122.41345524787904, "text": "Point_0_3" },
        { "lat": 37.77944097034384, "lng": -122.41348743438722, "text": "Point_0_4" },
        { "lat": 37.77923745480172, "lng": -122.41360545158388, "text": "Point_0_5" },
        { "lat": 37.7792204951479, "lng": -122.41399168968202, "text": "Point_0_6" },
        { "lat": 37.779275614008526, "lng": -122.41439402103425, "text": "Point_0_7" },
        { "lat": 37.77938585160652, "lng": -122.414887547493, "text": "Point_0_8" },
        { "lat": 37.77984799974718, "lng": -122.41487681865694, "text": "Point_0_9" },
        { "lat": 37.78033558410275, "lng": -122.41488218307497, "text": "Point_0_10" },
        { "lat": 37.78054757629764, "lng": -122.41516113281251, "text": "Point_0_11" },
        { "lat": 37.78055181613535, "lng": -122.41571366786958, "text": "Point_0_12" },
        { "lat": 37.78033982395262, "lng": -122.41540253162384, "text": "Point_0_13" },
        { "lat": 37.78016598990908, "lng": -122.41532742977144, "text": "Point_0_14" },
        { "lat": 37.779958236491574, "lng": -122.41532742977144, "text": "Point_0_15" },
        { "lat": 37.779699603870185, "lng": -122.41532206535341, "text": "Point_0_16" },
        { "lat": 37.77986495925703, "lng": -122.41565465927125, "text": "Point_0_17" },
        { "lat": 37.779843759869124, "lng": -122.41598188877107, "text": "Point_0_18" },
        { "lat": 37.779623285874564, "lng": -122.41595506668092, "text": "Point_0_19" },
        { "lat": 37.77957240716703, "lng": -122.41595640778543, "text": "Point_0_20" },
        { "lat": 37.77956, "lng": -122.41596, "text": "Engineering Building" },
        { "lat": 37.77964130540841, "lng": -122.41619512438777, "text": "Point_0_1" },
        { "lat": 37.77898305958608, "lng": -122.41626754403116, "text": "Point_0_2" },
        { "lat": 37.77901697899874, "lng": -122.4164378643036, "text": "Point_0_3" },
        { "lat": 37.77951198865635, "lng": -122.41646602749826, "text": "Point_0_4" },
        { "lat": 37.779718683356776, "lng": -122.41663768887521, "text": "Villa" }
    ],
    // Concatenated path from Gym to Foyer to Engineering Building to Villa
    [
        { "lat": 37.78161600770584, "lng": -122.41449058055879, "text": "Gym" },
        { "lat": 37.781611767929206, "lng": -122.41413652896883, "text": "Point_0_1" },
        { "lat": 37.7815630104802, "lng": -122.41376101970674, "text": "Foyer" },
        { "lat": 37.78041190136295, "lng": -122.4136108160019, "text": "Point_0_1" },
        { "lat": 37.77982680035444, "lng": -122.41350352764131, "text": "Point_0_2" },
        { "lat": 37.77961480609239, "lng": -122.41345524787904, "text": "Point_0_3" },
        { "lat": 37.77944097034384, "lng": -122.41348743438722, "text": "Point_0_4" },
        { "lat": 37.77923745480172, "lng": -122.41360545158388, "text": "Point_0_5" },
        { "lat": 37.7792204951479, "lng": -122.41399168968202, "text": "Point_0_6" },
        { "lat": 37.779275614008526, "lng": -122.41439402103425, "text": "Point_0_7" },
        { "lat": 37.77938585160652, "lng": -122.414887547493, "text": "Point_0_8" },
        { "lat": 37.77984799974718, "lng": -122.41487681865694, "text": "Point_0_9" },
        { "lat": 37.78033558410275, "lng": -122.41488218307497, "text": "Point_0_10" },
        { "lat": 37.78054757629764, "lng": -122.41516113281251, "text": "Point_0_11" },
        { "lat": 37.78055181613535, "lng": -122.41571366786958, "text": "Point_0_12" },
        { "lat": 37.78033982395262, "lng": -122.41540253162384, "text": "Point_0_13" },
        { "lat": 37.78016598990908, "lng": -122.41532742977144, "text": "Point_0_14" },
        { "lat": 37.779958236491574, "lng": -122.41532742977144, "text": "Point_0_15" },
        { "lat": 37.779699603870185, "lng": -122.41532206535341, "text": "Point_0_16" },
        { "lat": 37.77986495925703, "lng": -122.41565465927125, "text": "Point_0_17" },
        { "lat": 37.779843759869124, "lng": -122.41598188877107, "text": "Point_0_18" },
        { "lat": 37.779623285874564, "lng": -122.41595506668092, "text": "Point_0_19" },
        { "lat": 37.77957240716703, "lng": -122.41595640778543, "text": "Point_0_20" },
        { "lat": 37.77956, "lng": -122.41596, "text": "Engineering Building" },
        { "lat": 37.77964130540841, "lng": -122.41619512438777, "text": "Point_0_1" },
        { "lat": 37.77898305958608, "lng": -122.41626754403116, "text": "Point_0_2" },
        { "lat": 37.77901697899874, "lng": -122.4164378643036, "text": "Point_0_3" },
        { "lat": 37.77951198865635, "lng": -122.41646602749826, "text": "Point_0_4" },
        { "lat": 37.779718683356776, "lng": -122.41663768887521, "text": "Villa" }
    ]
];

// Function to find the path in manually drawn paths
function findManualPath(start, end) {
    for (const path of manualPaths) {
        const startIndex = path.findIndex(point => point.text === start);
        const endIndex = path.findIndex(point => point.text === end);
        if (startIndex !== -1 && endIndex !== -1) {
            if (startIndex < endIndex) {
                return path.slice(startIndex, endIndex + 1);
            } else {
                return path.slice(endIndex, startIndex + 1).reverse();
            }
        }
    }
    return [];
}

// Function to compute and display the path using manually drawn paths
function computeAndDisplayPath() {
    const start = document.getElementById('start-waypoint').value;
    const end = document.getElementById('end-waypoint').value;

    console.log(`Computing path from "${start}" to "${end}"`); // Log user input

    if (!start || !end) {
        alert('Please select both start and end waypoints.');
        console.warn('Start or end waypoint not selected.'); // Log warning
        return;
    }

    if (start === end) {
        alert('Start and end waypoints must be different.');
        console.warn('Start and end waypoints are the same.'); // Log warning
        return;
    }

    let route = findManualPath(start, end);
    console.log('Final route:', route); // Log final route
    if (route.length === 0) {
        alert('No path found between the selected waypoints.');
        return;
    }

    displayShortestPath(route);
}

// Function to display the path in red
function displayShortestPath(route) {
    console.log('Displaying path:', route); // Log the route
    pathLayer.clearLayers(); // Clear existing paths
    const latLngs = route.map(point => [point.lat, point.lng]);
    L.polyline(latLngs, { color: 'red', weight: 4, opacity: 0.9 }).addTo(pathLayer);
    console.log('Path drawn on the map in red.'); // Confirm drawing
}

// Add a layer group to manage drawn paths
const pathLayer = L.layerGroup().addTo(map);

// Add click event to display latitude and longitude
map.on('click', function(e) {
    const { lat, lng } = e.latlng;
    const coordinatesDiv = document.getElementById('coordinates');
    coordinatesDiv.innerText = `Latitude: ${lat.toFixed(5)}, Longitude: ${lng.toFixed(5)}`;
    coordinatesDiv.style.display = 'block';
});

// Modal close functionality
document.querySelector('.close').onclick = function() {
    document.getElementById('modal').style.display = 'none';
};

// Explore function to pan and zoom the map to the selected waypoint
function explore(location) {
    const waypoint = waypoints.find(wp => wp.text === location);
    if (waypoint) {
        map.setView([waypoint.lat, waypoint.lng], 19, { animate: true }); // Pan and zoom to the selected waypoint
    }
}

// Ensure the DOM is fully loaded before accessing elements
document.addEventListener('DOMContentLoaded', () => {
    // Populate the start and end waypoint dropdowns
    const startSelect = document.getElementById('start-waypoint');
    const endSelect = document.getElementById('end-waypoint');

    waypoints.forEach(waypoint => {
        const option = document.createElement('option');
        option.value = waypoint.text;
        option.text = waypoint.text;
        startSelect.appendChild(option.cloneNode(true));
        endSelect.appendChild(option);
    });

    // Allow user to input start and end locations
    // Add event listener to compute and display the path when user submits selection
    document.getElementById('compute-path-button').addEventListener('click', computeAndDisplayPath);
});

// Reintroduce drawing tool functionality
let drawing = false;
let currentPath = [];
const drawnPaths = [];

// Function to start drawing a path
function startDrawing() {
    drawing = true;
    currentPath = [];
    map.on('click', addPointToPath);
}

// Function to stop drawing a path
function stopDrawing() {
    drawing = false;
    map.off('click', addPointToPath);
    if (currentPath.length > 1) {
        drawnPaths.push(currentPath);
        L.polyline(currentPath, { color: 'red', weight: 4, opacity: 0.7 }).addTo(map);
    }
}

// Function to add a point to the current path
function addPointToPath(e) {
    const { lat, lng } = e.latlng;
    const newPoint = { lat, lng, text: `Point_${drawnPaths.length}_${currentPath.length}` };
    currentPath.push(newPoint);
    L.marker([lat, lng]).addTo(map).bindPopup(newPoint.text);
    
    // Connect the new point with the previous point
    if (currentPath.length > 1) {
        const from = currentPath[currentPath.length - 2].text;
        const to = newPoint.text;
        addEdge(from, to);
        L.polyline([[currentPath[currentPath.length - 2].lat, currentPath[currentPath.length - 2].lng], [lat, lng]], { color: 'red', weight: 2, opacity: 0.7 }).addTo(map);
    }
}

// Function to save the drawn paths
function savePaths() {
    const paths = drawnPaths.map(path => path.map(point => ({ lat: point.lat, lng: point.lng, text: point.text })));
    console.log(JSON.stringify(paths, null, 2)); // Log the paths in a readable format
    // You can send the paths to your server or save them in local storage
}

// Add drawing tools to the map
const drawingTools = L.control({ position: 'bottomleft' });
drawingTools.onAdd = function() {
    const div = L.DomUtil.create('div', 'drawing-tools');
    div.innerHTML = `
        <button onclick="startDrawing()">Start Drawing</button>
        <button onclick="stopDrawing()">Stop Drawing</button>
        <button onclick="savePaths()">Save Paths</button>
    `;
    return div;
};
drawingTools.addTo(map);
